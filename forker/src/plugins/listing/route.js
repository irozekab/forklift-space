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
    method: 'PUT',
    path: '/{id}',
    config: Controller.edit,
}, {
    method: 'PATCH',
    path: '/{id}',
    config: Controller.edit,
}, {
    method: 'POST',
    path: '/',
    config: Controller.add,
}, {
    method: 'DELETE',
    path: '/{id}',
    config: Controller.delete,
}, ];