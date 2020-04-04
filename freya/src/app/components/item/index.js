require('./style.scss');
angular.module('app').component('item', {
    template: require('./template.html'),
    bindings: {
        item: '=',
        isTile: '=',
    },
    controller: ItemController,
});
/** @ngInject */
function ItemController(ListingService) {
    const vm = this;
    vm.$onInit = () => {
        vm.deleteListing = deleteListing;
        vm.publishListing = publishListing;
        vm.unpublishListing = unpublishListing;
        vm.soldListing = soldListing;
        vm.unsoldListing = unsoldListing;
        vm.isPending = false;
    };

    function deleteListing() {
        if (!vm.isPending) {
            vm.isPending = true;
            ListingService.deleteListing(vm.item._id).then(() => {
                vm.isPending = false;
                vm.item.isDeleted = true;
            });
        }
    }

    function publishListing() {
        if (!vm.isPending) {
            vm.isPending = true;
            ListingService.publishListing(vm.item._id).then((response) => {
                vm.isPending = false;
                vm.item = response;
            });
        }
    }

    function unpublishListing() {
        if (!vm.isPending) {
            vm.isPending = true;
            ListingService.unpublishListing(vm.item._id).then((response) => {
                vm.isPending = false;
                vm.item = response;
            });
        }
    }

    function soldListing() {
        if (!vm.isPending) {
            vm.isPending = true;
            ListingService.soldListing(vm.item._id).then((response) => {
                vm.isPending = false;
                vm.item = response;
            });
        }
    }

    function unsoldListing() {
        if (!vm.isPending) {
            vm.isPending = true;
            ListingService.unsoldListing(vm.item._id).then((response) => {
                vm.isPending = false;
                vm.item = response;
            });
        }
    }
}