module.exports = {
    template: require('./template.html'),
    bindings: {
        listing: '<',
    },
    controller: ListingReadController,
};
/** @ngInject */
function ListingReadController(AuthService, ListingService, $state, toaster) {
    const vm = this;
    vm.$onInit = () => {
        vm.isOwner = AuthService.isOwner(vm.listing);
        vm.deleteListing = deleteListing;
        vm.publishListing = publishListing;
        vm.unpublishListing = unpublishListing;
        vm.soldListing = soldListing;
        vm.unsoldListing = unsoldListing;
        vm.crumbs = [{
            name: 'HOME',
            sref: 'home',
        }, {
            name: 'BROWSE LISTIINGS',
            sref: 'listing.browse',
        }, {
            name: 'LISTIING DETAIL',
        }, ];
        if (!vm.listing.isPublished) {
            toaster.pop('warning', 'Still a Draft!', 'This is still a Draft. Remember to publish it!');
        }
    };

    function deleteListing() {
        ListingService.deleteListing(vm.listing._id).then(() => {
            $state.go('profile.me');
        });
    }

    function publishListing() {
        if (!vm.pending) {
            vm.pending = true;
            ListingService.publishListing(vm.listing._id, vm.listing).then((response) => {
                vm.pending = false;
                const listing = response;
                $state.go('listing.read', {
                    id: listing._id,
                });
            });
        }
    }

    function unpublishListing() {
        if (!vm.pending) {
            vm.pending = true;
            ListingService.unpublishListing(vm.listing._id, vm.listing).then((response) => {
                vm.pending = false;
                const listing = response;
                $state.go('listing.read', {
                    id: listing._id,
                });
            });
        }
    }

    function soldListing() {
        if (!vm.pending) {
            vm.pending = true;
            ListingService.soldListing(vm.listing._id, vm.listing).then((response) => {
                vm.pending = false;
                const listing = response;
                $state.go('listing.read', {
                    id: listing._id,
                });
            });
        }
    }

    function unsoldListing() {
        if (!vm.pending) {
            vm.pending = true;
            ListingService.unsoldListing(vm.listing._id, vm.listing).then((response) => {
                vm.pending = false;
                const listing = response;
                $state.go('listing.read', {
                    id: listing._id,
                });
            });
        }
    }
}