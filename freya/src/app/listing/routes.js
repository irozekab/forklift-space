module.exports = routesConfig;
/** @ngInject */
function routesConfig($stateProvider) {
    $stateProvider.state('listing.add', {
        url: '/add',
        component: 'listing.add',
        data: {
            authenticate: true,
        },
    }).state('listing.edit', {
        url: '/:id/edit',
        component: 'listing.edit',
        resolve: {
            listing: resolveListingController,
        },
        data: {
            authenticate: true,
        },
    }).state('listing.read', {
        url: '/:id',
        component: 'listing.read',
        resolve: {
            listing: resolveListingController,
        },
    }).state('listing.browse', {
        url: '?search?brand?truck?motor?yearOfManufacture?sort?page?perPage',
        component: 'listing.browse',
    }).state('listing', {
        url: '/listing',
        abstract: true,
        parent: 'default',
        template: '<ui-view></ui-view>',
    });
}
/** @ngInject */
function resolveListingController($q, toaster, $state, ListingService, $stateParams) {
    const id = $stateParams.id;
    return ListingService.readListing(id).then((listing) => {
        if (!listing) {
            toaster.pop('warning', 'Opps!', 'This listing do not exists.');
            $state.go('home');
            return $q.reject('Listing do not exist.');
        }
        return listing;
    }, (error) => {
        toaster.pop('warning', 'Opps!', error.data.message);
        $state.go('home');
        return $q.reject(error.data.message);
    });
}