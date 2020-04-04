require('./style.scss');
angular.module('app').component('items', {
    template: require('./template.html'),
    controller: ItemsController,
    bindings: {
        query: '=',
        hideSearch: '<',
        hideFilter: '<',
        hideSort: '<',
    },
});
/** @ngInject */
function ItemsController(ListingService, AppService, $location) {
    const vm = this;
    vm.$onInit = () => {
        vm.totalItems = null;
        vm.filters = ListingService.filterOptions;
        vm.showFilter = false;
        vm.items = [];
        vm.isLoading = true;
        vm.sorts = {
            '-dateCreated': {
                name: 'Time: Latest first',
                value: '-dateCreated',
            },
            // eslint-disable-next-line
            'price': {
                name: 'Price: Lowest first',
                value: 'price',
            },
            '-price': {
                name: 'Price: Highest first',
                value: '-price',
            },
        };
        vm.reset = reset;
        vm.browseItems = browseItems;
        vm.setSort = setSort;
        vm.toggleShowFilter = toggleShowFilter;
        vm.search = search;
        browseItems();
    };

    function browseItems() {
        $location.search(vm.query);
        vm.isLoading = true;
        ListingService.browseListings(vm.query).then((response) => {
            vm.items = response.listings;
            vm.totalItems = response.totalItems;
            vm.isLoading = false;
            AppService.scrollToTop();
        });
    }

    function reset() {
        vm.query = {
            page: 1,
            perPage: 25,
            sort: '-dateCreated',
            profile: vm.query.profile,
        };
    }

    function setSort(sort) {
        vm.query.sort = sort;
        browseItems();
    }

    function toggleShowFilter() {
        vm.showFilter = !vm.showFilter;
        if (!vm.showFilter) {
            browseItems();
        }
    }

    function search(search) {
        vm.query.search = search;
        browseItems();
    }
}