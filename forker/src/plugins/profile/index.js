'use strict';
const Route = require('./route');
const Model = require('./model');
const FindOrCreate = require('mongoose-findorcreate');
const register = function (server, options, next) {
    server.dependency(['database', ], (_server, _next) => {
        const Mongoose = _server.app.Mongoose;
        const ProfileSchema = new Mongoose.Schema(Model.schema, {
            toObject: {
                virtuals: true,
            },
            toJSON: {
                virtuals: true,
            },
        });
        ProfileSchema.virtual('_isRegistered').get(Model.virtuals._isRegistered);
        ProfileSchema.statics = Model.statics;
        ProfileSchema.plugin(FindOrCreate);
        Mongoose.model('Profile', ProfileSchema);
        _server.route(Route);
        _server.ext('onPostAuth', (request, reply) => {
            if (request.auth.isAuthenticated) {
                const Profile = request.server.app.Mongoose.models.Profile;
                const identity = request.auth.credentials.sub;
                Profile.findByIdentity(identity, (error, profile) => {
                    if (error) {
                        return reply(error);
                    }
                    request.auth.profile = profile;
                    return reply.continue();
                });
            }
            else {
                return reply.continue();
            }
        });
        _next();
    });
    next();
};
register.attributes = {
    name: 'profile',
    version: '1.0.0',
};
module.exports = register;