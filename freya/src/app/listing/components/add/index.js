module.exports = {
    template: require('./template.html'),
    controller: ListingAddController,
};
/** @ngInject */
function ListingAddController(ListingService, $state) {
    const vm = this;
    vm.$onInit = () => {
        vm.listing = {
            currency: 'sgd',
        };
        vm.fields = ListingService.fields;
        vm.pending = false;
        vm.crumbs = [{
            name: 'HOME',
            sref: 'home',
        }, {
            name: 'BROWSE LISTIINGS',
            sref: 'listing.browse',
        }, {
            name: 'CREATE A NEW LISTIING',
        }, ];
        vm.addListing = addListing;
    };

    function addListing() {
        if (!vm.pending) {
            vm.pending = true;
            ListingService.addListing(vm.listing).then((listing) => {
                vm.listing = listing;
                $state.go('listing.read', {
                    id: listing.slug,
                });
            });
        }
    }
}