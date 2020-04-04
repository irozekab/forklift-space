'use strict';
const Route = require('./route');
const Model = require('./model');
const register = function (server, options, next) {
    server.dependency(['database', 'methods', ], (_server, _next) => {
        const Mongoose = server.app.Mongoose;
        const DirectoryCategorySchema = new Mongoose.Schema(Model.schema, {
            toObject: {
                virtuals: true,
            },
            toJSON: {
                virtuals: true,
            },
        });
        Mongoose.model('DirectoryCategory', DirectoryCategorySchema);
        DirectoryCategorySchema.pre('save', function (next) {
            const that = this;
            const slugify = server.methods.slugify;
            that.slug = slugify(that.name);
            next();
        });
        DirectoryCategorySchema.statics = Model.statics;
        _server.route(Route);
        _next();
    });
    next();
};
register.attributes = {
    name: 'directoryCategory',
    version: '1.0.0',
};
module.exports = register;