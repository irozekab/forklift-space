'use strict';
const Path = require('path');
const root = Path.normalize(__dirname + '/../..');
const environment = process.env.NODE_ENV || 'local';
const EnvironmentConfig = require('./' + environment);
module.exports = {
    app: {
        environment,
        email: EnvironmentConfig.app.email || '',
    },
    manifest: {
        server: {},
        connections: [{
            port: process.env.PORT || 9000,
            routes: {
                files: {
                    relativeTo: Path.join(root, 'src/public'),
                },
            },
        }, ],
        registrations: [{
            plugin: 'inert',
        }, {
            plugin: 'vision',
        }, {
            plugin: {
                register: 'visionary',
                options: {
                    engines: {
                        html: require('handlebars'),
                    },
                    path: Path.join(root, 'src/views'),
                },
            },
        }, {
            plugin: {
                register: 'good',
                options: {
                    opsInterval: 300000,
                    reporters: [{
                        reporter: require('good-file'),
                        events: {
                            ops: '*',
                        },
                        config: {
                            path: Path.join(root, 'src/logs'),
                            prefix: 'hapi-process',
                            rotate: 'daily',
                        },
                    }, {
                        reporter: require('good-file'),
                        events: {
                            response: '*',
                        },
                        config: {
                            path: Path.join(root, 'src/logs'),
                            prefix: 'hapi-request',
                            rotate: 'daily',
                        },
                    }, {
                        reporter: require('good-file'),
                        events: {
                            error: '*',
                        },
                        config: {
                            path: Path.join(root, 'src/logs'),
                            prefix: 'hapi-error',
                            rotate: 'daily',
                        },
                    }, ],
                },
            },
        }, {
            plugin: {
                register: './methods',
            },
        }, {
            plugin: {
                register: './database',
                options: {
                    uri: EnvironmentConfig.database.uri || null,
                },
            },
        }, {
            plugin: {
                register: Path.join(root, 'src/plugins/profile'),
            },
            options: {
                routes: {
                    prefix: '/api/profiles',
                },
            },
        }, {
            plugin: {
                register: Path.join(root, 'src/plugins/photo'),
                options: {
                    config: {
                        cloud_name: 'itsykumo',
                        api_key: '924127291278583',
                        api_secret: 'Lie27s-RVUKtg7mh_qxyCEf8pkE',
                    },
                    uploadOptions: {
                        upload_preset: 'forker',
                        tags: EnvironmentConfig.photo.uploadOptions.tags || [],
                    },
                },
            },
            options: {
                routes: {
                    prefix: '/api/photos',
                },
            },
        }, {
            plugin: {
                register: Path.join(root, 'src/plugins/listing'),
            },
            options: {
                routes: {
                    prefix: '/api/listings',
                },
            },
        }, {
            plugin: {
                register: Path.join(root, 'src/plugins/directoryCategory'),
            },
            options: {
                routes: {
                    prefix: '/api/directory-categories',
                },
            },
        }, {
            plugin: {
                register: Path.join(root, 'src/plugins/business'),
            },
            options: {
                routes: {
                    prefix: '/api/businesses',
                },
            },
        }, {
            plugin: {
                register: Path.join(root, 'src/plugins/mail'),
                options: {
                    // eslint-disable-next-line
                    key: EnvironmentConfig.mail.key || 'key-d90778380890d49e11550a2650e94e3a',
                    domain: EnvironmentConfig.mail.domain || 'forklift.space',
                },
            },
            options: {
                routes: {
                    prefix: '/api/mails',
                },
            },
        }, {
            plugin: {
                register: Path.join(root, 'src/plugins/auth'),
                options: {
                    clientId: 'AeVoyNGxmV071WX0OBlEqpYT020dfQbO',
                    // eslint-disable-next-line
                    clientSecret: 'IW4l8XXqaEqOjX-XASbKeTpgyur4DDTFNZCl9W-ZOnUcLF6DyQUZYmHuUP8WqP1a',
                    algorithms: 'HS256',
                },
            },
        }, {
            plugin: {
                register: './seeder',
                options: {
                    seed: EnvironmentConfig.seeder.seed || false,
                },
            },
        }, ],
    },
};