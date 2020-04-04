'use strict';
const Boom = require('boom');
const _ = require('lodash');
module.exports = {
    browse: {
        auth: false,
        handler: function (request, reply) {
            const DirectoryCategory = request.server.app.Mongoose.models.DirectoryCategory;
            const query = {
                subCategories: {
                    $gt: [],
                },
            };
            DirectoryCategory.find(query, (error, directoryCategories) => {
                if (error) {
                    return reply(Boom.badImplementation(error));
                }
                return reply({
                    directoryCategories,
                });
            }).populate('subCategories');
        },
    },
};