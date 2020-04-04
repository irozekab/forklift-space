'use strict';
const Route = require('./route');
const Model = require('./model');
const register = function (server, options, next) {
    server.dependency(['database', 'directoryCategory', ], (_server, _next) => {
        const Mongoose = server.app.Mongoose;
        const BusinessSchema = new Mongoose.Schema(Model.schema, {
            toObject: {
                virtuals: true,
            },
            toJSON: {
                virtuals: true,
            },
        });
        BusinessSchema.statics = Model.statics;
        Mongoose.model('Business', BusinessSchema);
        _server.route(Route);
        _next();
    });
    next();
};
register.attributes = {
    name: 'business',
    version: '1.0.0',
};
module.exports = register;