const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const promisify = require('es6-promisify');

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

const generateHTML = (filename, options = {}) => {
    const html = pug.renderFile(`${__dirname}/../views/email/${filename}.pug`, options);
    const inlined = juice(html);
    return inlined;
};

exports.send = async (options) => {
    const html = generateHTML(options.filename, options);
    const text = htmlToText.fromString(html);
    const mailOptions = {
        from: `Clint Losee <noreply@clintlosee.com>`,
        to: options.user.email,
        subject: options.subject,
        html,
        text
    };

    const sendMail = promisify(transport.sendMail, transport);
    return sendMail(mailOptions);
};

// transport.sendMail({
//     from: 'Clint Losee <clint.losee@gmail.com>',
//     to: 'randy@example.com',
//     subject: 'Just Testing This Out',
//     html: '<strong>Howdy</strong> there! You are awesome',
//     text: '**Howdy** there! Your are awesome'
// });
