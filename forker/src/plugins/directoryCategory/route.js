'use strict';
const Controller = require('./controller');
module.exports = [{
    method: 'GET',
    path: '/',
    config: Controller.browse,
}, ];