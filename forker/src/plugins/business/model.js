'use strict';
const Joi = require('joi');
const Mongoose = require('mongoose');
module.exports.schema = {
    name: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    fax: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    categories: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'DirectoryCategory',
    }],
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    dateModified: {
        type: Date,
        default: Date.now,
    },
    address: {
        street: {
            type: String,
            trim: true,
        },
        city: {
            type: String,
            trim: true,
        },
        postal: {
            type: String,
            trim: true,
        },
        country: {
            type: String,
            trim: true,
        },
    },
};
module.exports.validation = Joi.object({}).options({
    abortEarly: false,
    allowUnknown: true,
});
module.exports.statics = {
    browse: function (query, callback) {
        const that = this;
        const DirectoryCategory = that.db.models.DirectoryCategory;
        const perPage = query.perPage ? parseInt(query.perPage) : 0;
        const page = query.page ? parseInt(query.page) : 1;
        const sort = '-name';
        const directoryCategoryQuery = {
            slug: query.subCategory,
            subCategories: {
                $eq: [],
            },
        };
        DirectoryCategory.findOne(directoryCategoryQuery, (error, directoryCategory) => {
            const _query = {
                categories: directoryCategory,
            };
            that.find(_query).count().then((count) => {
                that.find(_query).sort(sort).skip((page - 1) * perPage).limit(perPage).exec((error, businesses) => {
                    if (error) {
                        return callback(error, null, null);
                    }
                    return callback(null, businesses, count);
                });
            });
        });
    },
};