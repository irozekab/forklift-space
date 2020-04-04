'use strict';
module.exports = {
    app: {
        email: 'itsykumo@gmail.com',
    },
    database: {
        uri: 'mongodb://admin:ryVZ7F8Bers5yeen@ds133331.mlab.com:33331/forker-development',
    },
    mail: {},
    seeder: {
        seed: false,
    },
    photo: {
        uploadOptions: {
            tags: ['local', ],
        },
    },
    acme: {
        to: 'itsykumo@gmail.com',
    },
};