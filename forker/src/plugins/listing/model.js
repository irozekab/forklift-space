'use strict';
const Mongoose = require('mongoose');
const Joi = require('joi');
module.exports.schema = {
    brand: {
        type: String,
        trim: true,
    },
    model: {
        type: String,
        trim: true,
    },
    profile: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
    },
    slug: {
        type: String,
        trim: true,
        unique: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    dateModified: {
        type: Date,
        default: Date.now,
    },
    truck: {
        type: String,
        trim: true,
    },
    motor: {
        type: String,
        trim: true,
    },
    currency: {
        type: String,
        required: true,
        enum: ['sgd', 'usd', 'euro', ],
        default: 'sgd',
        lowercase: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    ratedLoadingCapacity: {
        type: Number,
        default: 0,
    },
    yearOfManufacture: {
        type: Number,
    },
    serialNumber: {
        type: String,
        trim: true,
    },
    mastHeight: {
        type: Number,
        default: 0,
    },
    liftingHeight: {
        type: Number,
        default: 0,
    },
    forkLength: {
        type: Number,
        default: 0,
    },
    sideShift: {
        type: String,
        trim: true,
    },
    mastStage: {
        type: String,
        trim: true,
    },
    hoursUsed: {
        type: Number,
        default: 0,
    },
    photos: [{
        type: String,
    }, ],
    mainPhotoIndex: {
        type: Number,
        default: 0,
    },
    remarks: {
        type: String,
        trim: true,
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    isSold: {
        type: Boolean,
        default: false,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
};
module.exports.validation = Joi.object({}).options({
    abortEarly: false,
    allowUnknown: true,
});
module.exports.virtuals = {
    _state: function () {
        const that = this;
        if (that.isDeleted) {
            return 'deleted';
        }
        else if (that.isSold) {
            return 'sold';
        }
        else if (that.isPublished) {
            return 'published';
        }
        else {
            return 'draft';
        }
    },
};
module.exports.statics = {
    browse: function (query, callback) {
        const that = this;
        const perPage = query.perPage ? parseInt(query.perPage) : 0;
        const page = query.page ? parseInt(query.page) : 1;
        const search = query.search;
        // eslint-disable-next-line
        const sort = query.sort ? '-isFeatured ' + query.sort : '-isFeatured -dateCreated';
        const _query = {
            $or: [{
                brand: new RegExp(search, 'i'),
            }, {
                model: new RegExp(search, 'i'),
            }, {
                motor: new RegExp(search, 'i'),
            }, {
                truck: new RegExp(search, 'i'),
            }, {
                serialNumber: new RegExp(search, 'i'),
            }, {
                remarks: new RegExp(search, 'i'),
            }, ],
            isDeleted: false,
        };
        if (query.brand) {
            _query.brand = {
                $in: query.brand,
            };
        }
        if (query.motor) {
            _query.motor = {
                $in: query.motor,
            };
        }
        if (query.truck) {
            _query.truck = {
                $in: query.truck,
            };
        }
        if (query.sideShift) {
            _query.sideShift = {
                $in: query.sideShift,
            };
        }
        if (query.mastStage) {
            _query.mastStage = {
                $in: query.mastStage,
            };
        }
        if (query.profile) {
            _query.profile = query.profile;
        }
        if (!query.isOwner) {
            _query.isPublished = true;
        }
        that.find(_query).count().then((count) => {
            that.find(_query).sort(sort).skip((page - 1) * perPage).limit(perPage).populate('profile', 'name').exec((error, listings) => {
                if (error) {
                    return callback(error, null, null);
                }
                return callback(null, listings, count);
            });
        });
    },
};