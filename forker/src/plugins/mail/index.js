'use strict';
const Fs = require('fs');
const Path = require('path');
const Handlebars = require('handlebars');
const Mailgun = require('mailgun.js');
const Route = require('./route');
const register = function (server, options, next) {
    server.expose('send', (mail, callback) => {
        // eslint-disable-next-line
        const file = Fs.readFileSync(Path.join(__dirname, './templates/mail.handlebars'), 'utf8');
        const template = Handlebars.compile(file);
        Mailgun.client({
            username: 'api',
            key: options.key,
        }).messages.create(options.domain, {
            from: mail.name + ' <' + mail.email + '>',
            to: [mail.to, ],
            subject: mail.subject,
            html: template(mail),
        }).then((message) => {
            callback(null, message);
        }).catch((error) => {
            callback(error, null);
        });
    });
    server.route(Route);
    next();
};
register.attributes = {
    name: 'mail',
    version: '1.0.0',
};
module.exports = register;