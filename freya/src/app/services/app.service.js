angular.module('app').service('AppService', AppService);
/** @ngInject */
function AppService($location, $document) {
    const vm = this;
    vm.scrollToTop = scrollToTop;

    function scrollToTop() {
        const top = 0;
        const duration = 300;
        $document.scrollTop(top, duration);
    }
}