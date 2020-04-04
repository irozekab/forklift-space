'use strict';
const slugify = require('./slugify');
const register = (server, options, next) => {
    server.method('slugify', slugify);
    return next();
};
register.attributes = {
    name: 'methods',
    version: '1.0.0',
};
module.exports = register;