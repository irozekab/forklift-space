require('./style.scss');
angular.module('app').component('scrollUp', {
    template: require('./template.html'),
    controller: ScrollUpController,
});
/** @ngInject */
function ScrollUpController($scope, $window, AppService) {
    const vm = this;
    vm.$onInit = () => {
        vm.show = false;
        vm.scrollUp = scrollUp;
    };

    function scrollUp() {
        AppService.scrollToTop();
    }
    angular.element($window).bind('scroll', () => {
        vm.show = (this.pageYOffset >= 300);
        $scope.$apply();
    });
}