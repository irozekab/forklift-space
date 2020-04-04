module.exports = routesConfig;
/** @ngInject */
function routesConfig($stateProvider) {
    $stateProvider.state('landing', {
        url: '/',
        component: 'acme.landing',
        parent: 'bare',
        redirectTo: 'listing.browse',
    }).state('termsOfUseAndPrivacyPolicy', {
        url: '/termsOfUseAndPrivacyPolicy',
        component: 'acme.terms',
        parent: 'default',
    });
}