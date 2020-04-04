'use strict';
const Hoek = require('hoek');
const HapiAuthJwt = require('hapi-auth-jwt');
const register = function (server, options, next) {
    server.dependency(['profile', ]);
    server.register(HapiAuthJwt, (error) => {
        Hoek.assert(!error, error);
        server.auth.strategy('jwt', 'jwt', {
            key: new Buffer(options.clientSecret, 'base64'),
            verifyOptions: {
                algorithms: [options.algorithms, ],
                audience: options.clientId,
            },
        });
        server.auth.default('jwt');
    });
    next();
};
register.attributes = {
    name: 'auth',
    version: '1.0.0',
};
module.exports = register;