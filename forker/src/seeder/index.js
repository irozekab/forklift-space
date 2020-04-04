'use strict';
const register = function (server, options, next) {
    server.dependency(['database', 'profile', 'listing', 'business', ], (_server, _next) => {
        const Mongoose = _server.app.Mongoose;
        const environment = process.env.NODE_ENV;
        if (options.seed) {
            require('./' + environment)(Mongoose);
        }
        _next();
    });
    next();
};
register.attributes = {
    name: 'seeder',
    version: '1.0.0',
};
module.exports = register;