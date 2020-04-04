'use strict';
const Boom = require('boom');
const Mongoose = require('mongoose');
const Model = require('./model');
module.exports = {
    browse: {
        auth: {
            mode: 'optional',
        },
        handler: function (request, reply) {
            const Mongoose = request.server.app.Mongoose;
            const Listing = request.server.app.Mongoose.models.Listing;
            const query = request.query;
            query.isOwner = request.auth.profile && (request.auth.profile._id.toString() === query.profile) || false;
            Listing.browse(query, (error, listings, count) => {
                if (error) {
                    return reply(Boom.badImplementation(err));
                }
                return reply({
                    totalItems: count,
                    listings,
                });
            });
        },
    },
    read: {
        auth: false,
        handler: function (request, reply) {
            const Listing = request.server.app.Mongoose.models.Listing;
            let query;
            try {
                query = {
                    $or: [{
                        _id: Mongoose.Types.ObjectId(request.params.id),
                    }, {
                        slug: request.params.id,
                    }, ],
                    isDeleted: false,
                };
            }
            catch (error) {
                query = {
                    slug: request.params.id,
                    isDeleted: false,
                };
            }
            Listing.findOne(query, (error, listing) => {
                if (error) {
                    return reply(Boom.badImplementation(error));
                }
                return reply(listing);
            }).populate('profile', 'name company email contactNumber');
        },
    },
    edit: {
        validate: {
            payload: Model.alidation,
        },
        handler: function (request, reply) {
            const Listing = request.server.app.Mongoose.models.Listing;
            const slugify = request.server.methods.slugify;
            const query = {
                _id: request.params.id,
                isDeleted: false,
            };
            const payload = request.payload;
            payload.slug = slugify(payload.brand + '-' + payload.model + '-' + payload.id);
            payload.dateModified = Date.now();
            const options = {
                new: true,
            };
            Listing.findOneAndUpdate(query, payload, options).populate('profile', 'name company email contactNumber').exec((error, listing) => {
                if (error) {
                    return reply(Boom.badRequest('Listing could not be updated'));
                }
                if (!listing) {
                    return reply(Boom.notFound());
                }
                return reply(listing);
            });
        },
    },
    add: {
        validate: {
            payload: Model.validation,
        },
        handler: function (request, reply) {
            const Listing = request.server.app.Mongoose.models.Listing;
            const payload = request.payload;
            if (!request.auth.profile) {
                return reply(Boom.forbidden('User do not have a profile yet!'));
            }
            payload.profile = request.auth.profile;
            Listing.create(payload, (error, listing) => {
                if (error) {
                    return reply(Boom.forbidden(error));
                }
                return reply(listing).created();
            });
        },
    },
    delete: {
        handler: function (request, reply) {
            const Listing = request.server.app.Mongoose.models.Listing;
            const query = {
                _id: request.params.id,
            };
            const payload = {
                isDeleted: true,
                isPublished: false,
                dateModified: Date.now(),
            };
            const options = {
                new: true,
            };
            Listing.findOneAndUpdate(query, payload, options).populate('profile', 'name company email contactNumber').exec((error, listing) => {
                if (error) {
                    return reply(Boom.badRequest('Listing could not be deleted'));
                }
                if (!listing) {
                    return reply(Boom.notFound());
                }
                return reply(listing);
            });
        },
    },
};