require('./style.scss');
angular.module('app').component('navbar', {
    template: require('./template.html'),
    controller: NavbarController,
    bindings: {
        simple: '<',
    },
});
/** @ngInject */
function NavbarController($scope, $window, variables) {
    const vm = this;
    vm.$onInit = () => {
        vm.logo = variables.logo;
        vm.isCollapsed = true;
        vm.collapse = collapse;
        vm.isShow = true;
        vm.lastPageYOffset = 0;
        vm.scrollUpDistance = 0;
        vm.scrollDownDistance = 0;
    };

    function collapse() {
        vm.isCollapsed = true;
    }
    angular.element($window).bind('scroll', () => {
        if (this.pageYOffset < vm.lastPageYOffset) {
            vm.scrollUpDistance += (vm.lastPageYOffset - this.pageYOffset);
            if (vm.scrollUpDistance >= 200) {
                vm.scrollDownDistance = 0;
            }
        }
        else {
            vm.scrollDownDistance += (this.pageYOffset - vm.lastPageYOffset);
            if (vm.scrollDownDistance >= 200) {
                vm.scrollUpDistance = 0;
            }
        }
        vm.lastPageYOffset = this.pageYOffset;
        vm.isShow = (vm.scrollUpDistance >= 200 || this.pageYOffset <= 100);
        if (!vm.isShow) {
            vm.isCollapsed = true;
        }
        $scope.$apply();
    });
}