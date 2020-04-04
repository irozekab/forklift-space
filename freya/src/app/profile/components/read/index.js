module.exports = {
    template: require('./template.html'),
    bindings: {
        profile: '<',
    },
    controller: ProfileReadController,
};
/** @ngInject */
function ProfileReadController(ProfileService, $state) {
    const vm = this;
    vm.$onInit = () => {
        vm.isMyProfile = $state.current.name === 'profile.me';
        vm.query = {
            profile: vm.profile._id,
            sort: $state.params.sort || '-dateCreated',
            page: $state.params.page || 1,
            perPage: $state.params.perPage || 25,
        };
        if (vm.isMyProfile) {
            vm.crumbs = [{
                name: 'HOME',
                sref: 'home',
            }, {
                name: 'MY PROFILE',
            }, ];
        }
        else {
            vm.crumbs = [{
                name: 'HOME',
                sref: 'home',
            }, {
                name: 'BROWSE LISTINGS',
                sref: 'listing.browse',
            }, {
                name: 'USER PROFILE',
            }, ];
        }
    };
}