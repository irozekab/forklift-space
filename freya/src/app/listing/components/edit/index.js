module.exports = {
    template: require('./template.html'),
    bindings: {
        listing: '<',
    },
    controller: ListingEditController,
};
/** @ngInject */
function ListingEditController(ListingService, PhotoService, $state) {
    const vm = this;
    vm.$onInit = () => {
        vm.photos = [];
        vm.fields = ListingService.fields;
        vm.editListing = editListing;
        vm.deleteListing = deleteListing;
        vm.pending = false;
        vm.deletePhoto = PhotoService.deletePhoto;
        vm.setAsMainPhoto = PhotoService.setAsMainPhoto;
        vm.crumbs = [{
            name: 'HOME',
            sref: 'home',
        }, {
            name: 'BROWSE LISTIINGS',
            sref: 'listing.browse',
        }, {
            name: 'UPDATE LISTIING',
        }, ];
    };

    function editListing() {
        if (!vm.pending) {
            vm.pending = true;
            ListingService.editListing(vm.listing._id, vm.listing).then((listing) => {
                vm.listing = listing;
                $state.go('listing.read', {
                    id: listing.slug,
                });
            }).finally(() => {
                vm.pending = false;
            });
        }
    }

    function deleteListing() {
        if (!vm.pending) {
            vm.pending = true;
            ListingService.deleteListing(vm.listing._id).then(() => {
                $state.go('profile.me');
            }).finally(() => {
                vm.pending = false;
            });
        }
    }
}