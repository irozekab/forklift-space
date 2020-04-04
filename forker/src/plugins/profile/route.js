'use strict';
const Controller = require('./controller');
module.exports = [{
    method: 'GET',
    path: '/',
    config: Controller.browse,
}, {
    method: 'GET',
    path: '/{id}',
    config: Controller.read,
}, {
    method: 'GET',
    path: '/me',
    config: Controller.readMe,
}, {
    method: 'PUT',
    path: '/me',
    config: Controller.editMe,
}, ];