const mongoose = require('mongoose');
const Store = mongoose.model('Store');
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
    const store = await (new Store(req.body)).save();
    req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`);
    res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req, res) => {
    // query db for list of stores
    const stores = await Store.find();
    res.render('stores', { title: 'Stores', stores });
};

exports.editStore = async (req, res) => {
    // Find the store by id
    const store = await Store.findOne({ _id: req.params.id});
    // Confirm they are the owner of the store
    // TODO
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
    req.flash('success', `Successfully updated ${store.name}. <strong><a href="/stores/${store.slug}">View Store</a></strong>`);
    res.redirect(`/stores/${store._id}/edit`);
};

exports.getStoreBySlug = async (req, res, next) => {
    const store = await Store.findOne({ slug: req.params.slug });
    if(!store) return next();
    res.render('store', { title: `${store.name}`, store });
};

exports.getStoresByTag = async (req, res) => {
    const tags = await Store.getTagsList();
    const tag = req.params.tag;
    res.render('tags', { tags, title: 'Tags', tag });
};
