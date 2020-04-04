'use strict';
module.exports = {
    app: {
        email: 'contact@forklift.space',
    },
    database: {
        uri: process.env.MONGODB_URI,
    },
    mail: {},
    seeder: {
        seed: false,
    },
    photo: {
        uploadOptions: {
            tags: ['production', ],
        },
    },
    acme: {
        to: 'itsykumo@gmail.com',
    },
};