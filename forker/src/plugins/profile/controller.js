'use strict';
const Boom = require('boom');
const Mongoose = require('mongoose');
const Model = require('./model');
module.exports = {
    browse: {
        handler: function (request, reply) {
            const Profile = request.server.app.Mongoose.models.Profile;
            const query = {
                isDeleted: false,
            };
            Profile.find(query, '', (error, profiles) => {
                if (error) {
                    return reply(Boom.badImplementation(error));
                }
                return reply(profiles);
            });
        },
    },
    read: {
        handler: function (request, reply) {
            const Profile = request.server.app.Mongoose.models.Profile;
            let query;
            try {
                query = {
                    _id: Mongoose.Types.ObjectId(request.params.id),
                    isDeleted: false,
                };
            }
            catch (error) {
                return reply(Boom.badRequest('User do not exist.'));
            }
            Profile.findOne(query).exec((error, profile) => {
                if (error) {
                    return reply(Boom.badImplementation(error));
                }
                return reply(profile);
            });
        },
    },
    readMe: {
        handler: function (request, reply) {
            if (request.auth.profile) {
                return reply(request.auth.profile);
            }
            console.log('User has no profile.');
            const Profile = request.server.app.Mongoose.models.Profile;
            const profile = {
                identities: [request.auth.credentials.sub, ],
            };
            Profile.create(profile, (_error, _profile) => {
                if (_error) {
                    if (_error.code === 11000) {
                        // eslint-disable-next-line
                        console.error('A profile with the same email address already exists.');
                        const identity = request.auth.credentials.sub;
                        const errorInJSON = _error.toJSON();
                        const email = errorInJSON.op.email;
                        // eslint-disable-next-line
                        Profile.findOneAndAddIdentity({
                            email,
                        }, identity, (__error, __profile) => {
                            if (__error) {
                                // eslint-disable-next-line
                                return reply(Boom.badRequest('Identity cannot be added to profile'));
                            }
                            console.log('Adding identity to existing profile.');
                            return reply(__profile);
                        });
                    }
                    else {
                        return reply(Boom.badImplementation(_error));
                    }
                }
                else {
                    return reply(_profile).code(201);
                }
            });
        },
    },
    editMe: {
        validate: {
            payload: Model.validation,
        },
        handler: function (request, reply) {
            const Profile = request.server.app.Mongoose.models.Profile;
            const query = {
                _id: request.auth.profile._id,
                isDeleted: false,
            };
            const payload = request.payload;
            payload.dateModified = Date.now();
            const options = {
                new: true,
            };
            Profile.findOneAndUpdate(query, payload, options).exec((error, profile) => {
                if (error) {
                    return reply(Boom.badRequest('Profile could not be updated'));
                }
                if (!profile) {
                    return reply(Boom.notFound());
                }
                return reply(profile);
            });
        },
    },
};