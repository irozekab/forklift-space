'use strict';
const Boom = require('boom');
const _ = require('lodash');
module.exports = {
    browse: {
        auth: false,
        handler: function (request, reply) {
            const Business = request.server.app.Mongoose.models.Business;
            const query = request.query;
            Business.browse(query, (error, businesses, count) => {
                if (error) {
                    return reply(Boom.badImplementation(error));
                }
                return reply({
                    totalItems: count,
                    businesses,
                });
            });
        },
    },
};