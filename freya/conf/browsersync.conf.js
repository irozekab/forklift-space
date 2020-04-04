const conf = require('./gulp.conf');
const proxyMiddleware = require('http-proxy-middleware');
module.exports = function () {
    return {
        server: {
            baseDir: [
                conf.paths.tmp,
                conf.paths.src
            ]
        },
        middleware: [
            proxyMiddleware('/api', {
                target: 'http://localhost:9000'
            })
        ],
        open: false
    };
};