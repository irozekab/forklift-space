module.exports = {
    template: require('./template.html'),
    controller: TermsController,
};
/** @ngInject */
function TermsController() {
    const vm = this;
    vm.$onInit = () => {
        vm.crumbs = [{
            name: 'HOME',
            sref: 'home',
        }, {
            name: 'TERMS OF USE',
        }, ];
    };
}