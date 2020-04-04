'use strict';
const Controller = require('./controller');
module.exports = [{
    method: 'POST',
    path: '/',
    config: Controller.add,
}, ];