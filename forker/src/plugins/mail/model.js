'use strict';
const Joi = require('joi');
module.exports.validation = Joi.object({
    name: Joi.string().required(),
    contact: Joi.string(),
    body: Joi.string().required(),
}).options({
    abortEarly: false,
    allowUnknown: true,
});