'use strict';
const Moment = require('moment');
const Route = require('./route');
const Fs = require('fs');
const Cloudinary = require('cloudinary');
const _ = require('lodash');
const register = function (server, options, next) {
    Cloudinary.config(options.config);
    server.method('uploadPhoto', (photoPath, tags, callback) => {
        const _options = options.uploadOptions;
        // eslint-disable-next-line
        _options.tags = _.concat(_options.tags, 'date_' + Moment().format('YMM'), 'forker', tags);
        Cloudinary.v2.uploader.upload(photoPath, _options, (err, photo) => {
            Fs.exists(photoPath, (exists) => {
                if (exists) {
                    Fs.unlink(photoPath);
                }
            });
            return callback(err, photo);
        });
    });
    server.route(Route);
    return next();
};
register.attributes = {
    name: 'photos',
    version: '1.0.0',
};
module.exports = register;