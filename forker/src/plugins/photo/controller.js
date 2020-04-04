'use strict';
const Boom = require('boom');
const Path = require('path');
module.exports = {
    add: {
        payload: {
            output: 'file',
            maxBytes: 20242880,
            parse: true,
            allow: 'multipart/form-data',
            uploads: Path.normalize(__dirname + '/uploads/'),
        },
        handler: function (request, reply) {
            const tags = request.query.tags || [];
            const payload = request.payload;
            const uploadPhoto = request.server.methods.uploadPhoto;
            tags.push('profile_' + request.auth.profile._id.toString());
            uploadPhoto(payload.photo.path, tags, (error, photo) => {
                if (error) {
                    console.log(error);
                    return reply(Boom.badRequest('Photo upload fail'));
                }
                return reply(photo).created();
            });
        },
    },
};