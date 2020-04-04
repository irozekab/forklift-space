module.exports = routesConfig;
/** @ngInject */
function routesConfig($stateProvider) {
    $stateProvider.state('profile.me', {
        url: '/me',
        component: 'profile.read',
        resolve: {
            profile: resolveMyProfileController,
        },
        data: {
            authenticate: true,
        },
    }).state('profile.welcome', {
        url: '/welcome',
        component: 'profile.welcome',
    }).state('profile.edit', {
        url: '/edit',
        component: 'profile.edit',
        resolve: {
            profile: resolveMyProfileController,
        },
        data: {
            authenticate: true,
        },
    }).state('profile.read', {
        url: '/:id',
        component: 'profile.read',
        resolve: {
            profile: resolveProfileController,
        },
        data: {
            authenticate: true,
        },
    }).state('profile', {
        url: '/profile',
        abstract: true,
        parent: 'default',
        template: '<ui-view></ui-view>',
    });
}
/** @ngInject */
function resolveMyProfileController(AuthService) {
    return AuthService.profile;
}
/** @ngInject */
function resolveProfileController($q, toaster, $state, ProfileService, $stateParams) {
    const id = $stateParams.id;
    return ProfileService.readProfile(id).then((profile) => {
        if (!profile) {
            toaster.pop('warning', 'Opps!', 'Profile do not exists.');
            $state.go('home');
            return $q.reject('Profile do not exist.');
        }
        return profile;
    }, (error) => {
        toaster.pop('warning', 'Opps!', error.data.message);
        $state.go('home');
        return $q.reject(error.data.message);
    });
}