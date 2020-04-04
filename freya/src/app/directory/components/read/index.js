module.exports = {
    template: require('./template.html'),
    controller: DirectoryReadController,
};
/** @ngInject */
function DirectoryReadController($stateParams) {
    const vm = this;
    vm.$onInit = () => {
        vm.businessItemsParams = {
            category: $stateParams.category,
            subCategory: $stateParams.subCategory,
        };
        vm.crumbs = [{
            name: 'HOME',
            sref: 'home',
        }, {
            name: 'BROWSE DIRECTORY',
            sref: 'directory.browse',
        }, {
            name: $stateParams.category === 'others' ? $stateParams.subCategory.split('-').join(' ') : $stateParams.category.split('-').join(' ') + ' - ' + $stateParams.subCategory.split('-').join(' '),
        }, ];
    };
}