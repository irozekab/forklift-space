'use strict';
const Route = require('./route');
const Model = require('./model');
const register = function (server, options, next) {
    server.dependency(['database', 'profile', 'methods', ], (_server, _next) => {
        const Mongoose = _server.app.Mongoose;
        const ListingSchema = new Mongoose.Schema(Model.schema, {
            toObject: {
                virtuals: true,
            },
            toJSON: {
                virtuals: true,
            },
        });
        ListingSchema.virtual('_state').get(Model.virtuals._state);
        ListingSchema.statics = Model.statics;
        Mongoose.model('Listing', ListingSchema);
        ListingSchema.pre('save', function (next) {
            const that = this;
            const slugify = server.methods.slugify;
            that.slug = slugify(that.brand + '-' + that.model + '-' + that.id);
            next();
        });
        _server.route(Route);
        _next();
    });
    next();
};
register.attributes = {
    name: 'listing',
    version: '1.0.0',
};
module.exports = register;