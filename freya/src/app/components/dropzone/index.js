require('./style.scss');
angular.module('app').component('dropzone', {
    bindings: {
        pending: '=',
        photos: '=',
        mainPhotoIndex: '=',
    },
    template: require('./template.html'),
    controller: DropzoneController,
});
/** @ngInject */
function DropzoneController(PhotoService, $scope, _) {
    const vm = this;
    vm.$onInit = () => {
        vm.photosToBeUploaded = [];
        vm.invalidFiles = [];
        vm.deletePhoto = deletePhoto;
        vm.setAsMainPhoto = setAsMainPhoto;
        vm.addPhoto = addPhoto;
        vm.mainPhotoIndex = vm.mainPhotoIndex === angular.isUndefined ? 0 : vm.mainPhotoIndex;
    };

    function deletePhoto(index) {
        vm.photos.splice(index, 1);
    }

    function setAsMainPhoto(index) {
        vm.mainPhotoIndex = index;
    }

    function addPhoto(photos) {
        vm.pending = true;
        vm.photosToBeUploaded = _.concat(vm.photosToBeUploaded, photos);
        _.forEach(photos, (photo) => {
            if (!photo.$error) {
                PhotoService.addPhoto(photo).then((data) => {
                    vm.photos = vm.photos || [];
                    vm.photos.push(data.secure_url);
                }, () => {}, (progress) => {
                    photo.progress = progress;
                }).finally(() => {
                    _.remove(vm.photosToBeUploaded, photo);
                    if (_.isEmpty(vm.photosToBeUploaded)) {
                        vm.pending = false;
                    }
                });
            }
        });
    }
}