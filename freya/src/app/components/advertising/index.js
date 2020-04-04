angular.module('app').component('advertising', {
    template: require('./template.html'),
    controller: AdvertisingController,
});
/** @ngInject */
function AdvertisingController(AdvertisingService) {
    const vm = this;
    vm.$onInit = () => {
        vm.advertising = AdvertisingService.readNextBanner();
    };
}