require('./style.scss');
angular.module('app').component('spinner', {
    template: require('./template.html'),
    bindings: {
        size: '@',
    },
    controller: SpinnerController,
});
/** @ngInject */
function SpinnerController() {
    const vm = this;
    vm.$onInit = () => {
        switch (vm.size) {
            case 'xl':
                {
                    vm.sizeClass = 'ion-5x';
                    break;
                }
            case 'lg':
                {
                    vm.sizeClass = 'ion-4x';
                    break;
                }
            case 'md':
                {
                    vm.sizeClass = 'ion-3x';
                    break;
                }
            case 'sm':
                {
                    vm.sizeClass = 'ion-2x';
                    break;
                }
            case 'xs':
                {
                    vm.sizeClass = 'ion-1x';
                    break;
                }
            default:
                {
                    vm.sizeClass = '';
                    break;
                }
        }
    };
}