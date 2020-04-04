require('./style.scss');
angular.module('app').component('pagination', {
    template: require('./template.html'),
    bindings: {
        totalItems: '=',
        onChange: '=',
        page: '=',
        perPage: '=',
    },
    controller: PaginationController,
});
/** @ngInject */
function PaginationController($timeout) {
    const vm = this;
    vm.$onInit = () => {
        vm.localOnChange = localOnChange;
    };

    function localOnChange(isResetPage) {
        $timeout(() => {
            vm.onChange(isResetPage);
        });
    }
}