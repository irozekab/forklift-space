require('./style.scss');
angular.module('app').component('photos', {
    bindings: {
        photos: '<',
        photoIndex: '<',
    },
    template: require('./template.html'),
    controller: PhotoController,
});
/** @ngInject */
function PhotoController() {
    const vm = this;
    vm.$onInit = () => {
        vm.showPhoto = showPhoto;
        vm.photo = vm.photos[vm.photoIndex];
    };

    function showPhoto(photo) {
        vm.photo = photo;
    }
}