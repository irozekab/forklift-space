'use strict';
const Mongoose = require('mongoose');
const Joi = require('joi');
module.exports.schema = {
    name: {
        type: String,
        trim: true,
    },
    slug: {
        type: String,
        trim: true,
        unique: true,
    },
    subCategories: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'DirectoryCategory',
    }, ],
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    dateModified: {
        type: Date,
        default: Date.now,
    },
};
module.exports.validation = Joi.object({}).options({
    abortEarly: false,
    allowUnknown: true,
});