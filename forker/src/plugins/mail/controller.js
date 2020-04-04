'use strict';
const Boom = require('boom');
const Model = require('./model');
module.exports = {
    add: {
        auth: false,
        validate: {
            payload: Model.validation,
        },
        handler: function (request, reply) {
            const Mail = request.server.plugins.mail;
            Mail.send({
                name: request.payload.name,
                email: request.payload.email,
                to: request.server.app.email,
                subject: 'Contact Us',
                title: 'Contact Us',
                body: request.payload.body,
            }, (error, info) => {
                if (error) {
                    return reply(Boom.badRequest(error));
                }
                return reply();
            });
        },
    },
};