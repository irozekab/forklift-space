module.exports = {
    template: require('./template.html'),
    bindings: {
        profile: '<',
    },
    controller: ProfileEditController,
};
/** @ngInject */
function ProfileEditController(ProfileService, AuthService, $state) {
    const vm = this;
    vm.$onInit = () => {
        vm.fields = ProfileService.fields;
        vm.editMyProfile = editMyProfile;
        vm.isPending = false;
        vm.crumbs = [{
            name: 'HOME',
            sref: 'home',
        }, {
            name: 'MY PROFILE',
            sref: 'profile.me',
        }, {
            name: 'UPDATE MY PROFILE',
        }, ];
    };

    function editMyProfile() {
        if (!vm.isPending) {
            vm.isPending = true;
            ProfileService.editMyProfile(vm.profile).then((response) => {
                AuthService.setProfile(response.data);
                $state.go('profile.me', null, {
                    reload: true,
                });
            }).finally(() => {
                vm.isPending = false;
            });
        }
    }
}