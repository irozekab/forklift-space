module.exports = {
    template: require('./template.html'),
    controller: DirectoryBrowseController,
    bindings: {
        directoryCategories: '<',
    },
};
/** @ngInject */
function DirectoryBrowseController() {
    const vm = this;
    vm.$onInit = () => {
        vm.crumbs = [{
            name: 'HOME',
            sref: 'home',
        }, {
            name: 'BROWSE DIRECTORY',
        }, ];
    };
}