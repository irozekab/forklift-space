'use strict';
const Mongoose = require('mongoose');
const register = function (server, options, next) {
    Mongoose.connect(options.uri);
    server.app.Mongoose = Mongoose;
    Mongoose.connection.on('error', (error) => {
        console.error('MongoDB connection error: ' + error);
        process.exit(-1);
    });
    Mongoose.connection.once('open', () => {
        console.log('MongoDB connection success: ' + options.uri);
    });
    return next();
};
register.attributes = {
    name: 'database',
    version: '1.0.0',
};
module.exports = register;