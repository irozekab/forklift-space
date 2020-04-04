module.exports = {
    template: require('./template.html'),
    controller: ListingBrowseController,
};
/** @ngInject */
function ListingBrowseController($state) {
    const vm = this;
    vm.$onInit = () => {
        vm.query = {
            search: $state.params.search || '',
            sort: $state.params.sort || '-dateCreated',
            page: $state.params.page || 1,
            perPage: $state.params.perPage || 25,
            brand: $state.params.brand ? [].concat($state.params.brand) : [],
            motor: $state.params.motor ? [].concat($state.params.motor) : [],
            truck: $state.params.truck ? [].concat($state.params.truck) : [],
            sideShift: $state.params.sideShift ? [].concat($state.params.sideShift) : [],
            mastStage: $state.params.mastStage ? [].concat($state.params.mastStage) : [],
            // yearOfManufacture: $state.params.yearOfManufacture || [],
        };
        vm.crumbs = [{
            name: 'HOME',
            sref: 'home',
        }, {
            name: 'BROWSE LISTIINGS',
        }, ];
    };
}