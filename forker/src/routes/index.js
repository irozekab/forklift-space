'use strict';
module.exports = [{
    method: 'GET',
    path: '/public/{path*}',
    config: {
        auth: false,
        handler: {
            directory: {
                path: '.',
            },
        },
    },
}, {
    method: 'GET',
    path: '/sitemap.xml',
    config: {
        auth: false,
        handler: {
            file: 'sitemap.xml',
        },
    },
}, {
    method: 'GET',
    path: '/{path*}',
    config: {
        auth: false,
        handler: function (request, reply) {
            var environment = request.server.app.environment;
            return reply.view('index', {
                environment
            });
        },
    },
}, ];