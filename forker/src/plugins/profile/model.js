'use strict';
const _ = require('lodash');
const Joi = require('joi');
module.exports.schema = {
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    dateModified: {
        type: Date,
        default: Date.now,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
    },
    contactNumber: {
        type: String,
    },
    picture: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    identities: [{
        type: String,
    }, ],
    remarks: {
        type: String,
        trim: true,
    },
};
module.exports.validation = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
}).options({
    abortEarly: false,
    allowUnknown: true,
});
module.exports.virtuals = {
    _isRegistered: function () {
        const that = this;
        return !_.isEmpty(that.name) && !_.isEmpty(that.email);
    },
};
module.exports.statics = {
    findByIdentity: function (identity, callback) {
        const that = this;
        const query = {
            identities: identity,
        };
        that.findOne(query, (error, profile) => {
            return callback(error, profile);
        });
    },
    findOneAndAddIdentity: function (query, identity, callback) {
        const that = this;
        that.findOne(query, (error, profile) => {
            if (error) {
                console.error(error);
            }
            profile.identities.push(identity);
            profile.save((_error, _profile) => {
                return callback(_error, _profile);
            });
        });
    },
    findByIdOrIdentity: function (query, callback) {
        const that = this;
        const _query = Mongoose.Types.ObjectId.isValid(query) ? {
            $or: [{
                _id: query,
            }, {
                identities: query,
            }, ],
        } : {
            identities: query,
        };
        that.findOne(_query, (error, profile) => {
            if (error) {
                console.error(error);
            }
            return callback(error, profile);
        });
    },
};