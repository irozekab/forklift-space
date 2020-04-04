'use strict';
const Glue = require('glue');
const Hoek = require('hoek');
const Config = require('./config');
const Routes = require('./routes');
const _ = require('lodash');
Glue.compose(Config.manifest, {
    relativeTo: __dirname,
}, (err, server) => {
    Hoek.assert(!err, err);
    server.app = _.merge(server.app, Config.app);
    process.env.NODE_ENV = server.app.environment;
    server.route(Routes);
    server.start(() => {
        console.log('Server started ' + server.info.uri);
        console.log('Environment: ' + server.app.environment);
    });
});