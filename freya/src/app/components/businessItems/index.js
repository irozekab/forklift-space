import './style.scss';
angular.module('app').component('businessItems', {
    template: require('./template.html'),
    controller: BusinessItemsController,
    bindings: {
        params: '=',
    },
});
/** @ngInject */
function BusinessItemsController(BusinessService, AppService) {
    const vm = this;
    vm.$onInit = () => {
        vm.page = 1;
        vm.perPage = 25;
        vm.totalItems = null;
        vm.items = [];
        vm.isLoading = true;
        vm.browseItems = browseItems;
        browseItems();
    };

    function browseItems() {
        const params = angular.extend({
            page: vm.page,
            perPage: vm.perPage,
        }, vm.params);
        vm.isLoading = true;
        BusinessService.browseBusinesses(params).then((response) => {
            vm.items = response.data.businesses;
            vm.totalItems = response.data.totalItems;
            vm.isLoading = false;
            AppService.scrollToTop();
        });
    }
}