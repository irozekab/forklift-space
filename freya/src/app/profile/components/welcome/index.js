module.exports = {
    template: require('./template.html'),
    controller: WelcomeController,
};
/** @ngInject */
function WelcomeController(ProfileService, AuthService, $state) {
    const vm = this;
    vm.$onInit = () => {
        vm.fields = ProfileService.fields;
        vm.profile = {};
        vm.editMyProfile = editMyProfile;
        vm.isPending = false;
        vm.crumbs = [{
            name: 'HOME',
            sref: 'home',
        }, {
            name: 'CREATE YOUR PROFILE',
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