require('./style.scss');
angular.module('app').component('searchBar', {
    template: require('./template.html'),
    controller: SearchBarController,
});
/** @ngInject */
function SearchBarController($state, $timeout) {
    const vm = this;
    vm.$onInit = () => {
        vm.search = search;
        vm.show = false;
        vm.toggleShow = toggleShow;
        vm.q = '';
    };

    function search(q) {
        vm.q = '';
        $state.go('listing.browse', {
            search: q,
        });
    }

    function toggleShow() {
        vm.show = !vm.show;
        if (vm.show) {
            $timeout(() => {
                angular.element('#itsy-searchBar > .form-group').focus();
            });
        }
        else {
            vm.q = '';
        }
    }
}