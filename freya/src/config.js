module.exports = config;
/** @ngInject */
function config($stateProvider, $urlRouterProvider, $locationProvider, ngMetaProvider, variables) {
    $locationProvider.html5Mode(true).hashPrefix('!');
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('bare', {
        abstract: true,
        template: require('./layout/bare.html'),
    }).state('default', {
        abstract: true,
        template: require('./layout/default.html'),
    }).state('home', {
        redirectTo: 'landing',
    });
    // Doesn't seems to be working for DefaultTag and DefaultTitle, workaround is applied in run.js
    ngMetaProvider.useTitleSuffix(true);
    // ngMetaProvider.setDefaultTitle(variables.title);
    ngMetaProvider.setDefaultTitleSuffix(variables.titleSuffix);
    // ngMetaProvider.setDefaultTag('description', variables.description);
    // ngMetaProvider.setDefaultTag('keywords', variables.keywords);
}