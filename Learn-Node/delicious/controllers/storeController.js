const mongoose = require('mongoose');
const Store = mongoose.model('Store');
const User = mongoose.model('User');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
    storage: multer.memoryStorage(),
    fileFilter(req, file, next) {
        const isPhoto = file.mimetype.startsWith('image/');
        if(isPhoto) {
            next(null, true);
        } else {
            next({ message: 'That filetype is not allows!' }, false);
        }
    }
};

exports.homePage = (req, res) => {
    res.render('index');
};

exports.addStore = (req, res) => {
    res.render('editStore', { title: 'Add Store' });
};

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
    // check if there is no new file to resize
    if (!req.file) {
        next();
        return;
    }
    const extension = req.file.mimetype.split('/')[1];
    req.body.photo = `${uuid.v4()}.${extension}`;
    // now resize
    const photo = await jimp.read(req.file.buffer);
    await photo.resize(800, jimp.AUTO);
    await photo.write(`./public/uploads/${req.body.photo}`);
    // once written photo to our filesystem, keep going
    next();
};

exports.createStore = async (req, res) => {
    req.body.author = req.user._id;
    const store = await (new Store(req.body)).save();
    req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`);
    res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req, res) => {
    const page = req.params.page || 1;
    const limit = 6;
    const skip = (page * limit) - limit;

    // query db for list of stores
    const storesPromise = Store
        .find()
        .skip(skip)
        .limit(limit)
        .sort({ created: 'desc' });
    const countPromise = Store.count();

    const [stores, count] = await Promise.all([storesPromise, countPromise]);
    const pages = Math.ceil(count / limit);

    if (!stores.length && skip) {
        req.flash('info', `You asked for page ${page}, but that doesn't exist so I put you on page ${pages}`);
        res.redirect(`/stores/page/${pages}`);
        return;
    }
    res.render('stores', { title: 'Stores', stores, page, pages, count });
};

const confirmOwner = (store, user) => {
    if (!store.author.equals(user._id)) {
        throw Error('You must own a store in order to edit it!');
    }
};

exports.editStore = async (req, res) => {
    // Find the store by id
    const store = await Store.findOne({ _id: req.params.id});
    // Confirm they are the owner of the store
    confirmOwner(store, req.user);
    // Render the edit form so it can be updated
    res.render('editStore', { title: `Edit ${store.name}`, store });
};

exports.updateStore = async (req, res) => {
    // set location data to be a point for map purposes
    req.body.location.type = 'Point';
    // Find and update store
    const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true, // returns new store instead of old one
        runValidators: true
    }).exec();
    // Redirect to store and notify them it worked
    req.flash('success', `Successfully updated ${store.name}. <strong><a href="/store/${store.slug}">View Store</a></strong>`);
    res.redirect(`/stores/${store._id}/edit`);
};

exports.getStoreBySlug = async (req, res, next) => {
    const store = await Store.findOne({ slug: req.params.slug }).populate('author reviews');
    if(!store) return next();
    res.render('store', { title: `${store.name}`, store });
};

exports.getStoresByTag = async (req, res) => {
    const tag = req.params.tag;
    const tagQuery = tag || { $exists: true };
    const tagsPromise = Store.getTagsList();
    const storesPromise = Store.find({ tags: tagQuery });
    const [tags, stores] = await Promise.all([tagsPromise, storesPromise]);

    res.render('tags', { tags, title: 'Tags', tag, stores });
};

exports.searchStores = async (req, res) => {
    const stores = await Store.find({
        $text: {
            $search: req.query.q
        }
    }, {
        score: {
            $meta: 'textScore'
        }
    })
    .sort({
        score: { $meta: 'textScore' }
    })
    .limit(5);
    res.send(stores);
};

exports.mapStores = async (req, res) => {
    const coords = [req.query.lng, req.query.lat].map(parseFloat);
    const q = {
        location: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: coords
                },
                $maxDistance: 10000 // 10km
            }
        }
    };

    const stores = await Store.find(q).select('slug name description location photo').limit(10);
    res.json(stores);
};

exports.mapPage = (req, res) => {
    res.render('map', { title: 'Map' });
};

exports.heartStore = async (req, res) => {
    const hearts = req.user.hearts.map(obj => obj.toString());
    const operator = hearts.includes(req.params.id) ? '$pull' : '$addToSet';
    const user = await User
        .findOneAndUpdate(req.user._id,
            { [operator]: { hearts: req.params.id }},
            { new: true }
        );
    res.json(user);
};

exports.getHearts = async (req, res) => {
    const stores = await Store.find({
        _id: { $in: req.user.hearts }
    });
    res.render('stores', { title: 'Hearted Stores', stores });
};

exports.getTopStores = async (req, res) => {
    const stores = await Store.getTopStores();
    res.render('topStores', { stores, title: 'Top Stores!' });
};
