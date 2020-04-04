angular.module('app').service('PhotoService', PhotoService);
/** @ngInject */
function PhotoService(Upload, toaster, moment, AuthService, variables) {
    const vm = this;
    vm.addPhoto = addPhoto;

    function addPhoto(photo) {
        const tags = ['date_' + moment().format('YMM'), 'forker', 'profile_' + AuthService.profile._id,
            variables.environment,
        ];
        return Upload.upload({
            url: variables.cloudinary.url,
            data: {
                file: photo,
                tags,
                // eslint-disable-next-line
                upload_preset: variables.cloudinary.upload_preset,
            },
        }).then((response) => {
            toaster.pop('success', 'Photo uploaded.');
            return response.data;
        }, (response) => {
            toaster.pop('danger', '', 'There is an error in uploading photo, please try again after a refresh.');
            throw response;
        }, (progress) => {
            const progressPercentage = parseInt(100.0 * progress.loaded / progress.total, 10);
            return progressPercentage;
        });
    }
}