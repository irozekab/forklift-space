angular.module('app').config(authConfig).run(authRun).service('AuthService', AuthService).service('AuthResponseInterceptorService', AuthResponseInterceptorService);
/** @ngInject */
function authConfig(lockProvider, $httpProvider, jwtOptionsProvider, variables) {
    lockProvider.init({
        clientID: 'AeVoyNGxmV071WX0OBlEqpYT020dfQbO',
        domain: 'dexufto.au.auth0.com',
        options: {
            mustAcceptTerms: true,
            theme: {
                logo: variables.logo,
                primaryColor: '#ff6638',
            },
            languageDictionary: {
                signUpTerms: 'I agree to the <a href="/termsOfUseAndPrivacyPolicy" target="_blank">Terms of Use & Privacy Policy</a>.',
            },
            auth: {
                redirectUrl: variables.uri,
                responseType: 'token',
            },
        },
    });
    // eslint-disable-next-line
    jwtOptionsProvider.config({
        tokenGetter: ['jwtHelper', 'authManager', (jwtHelper, authManager) => {
            const token = localStorage.getItem('id_token');
            if (token && jwtHelper.isTokenExpired(token)) {
                localStorage.removeItem('id_token');
                localStorage.removeItem('profile');
                authManager.unauthenticate();
                return null;
            }
            return localStorage.getItem('id_token');
        }, ],
        whiteListedDomains: ['localhost', ],
        unauthenticatedRedirectPath: '/',
    });
    $httpProvider.interceptors.push('jwtInterceptor');
    $httpProvider.interceptors.push('AuthResponseInterceptorService');
}
/** @ngInject */
function authRun($rootScope, AuthService, authManager) {
    $rootScope.AuthService = AuthService;
    $rootScope.profileSetEvent = $rootScope.$on('profileSet', (event, profile) => {
        AuthService.profile = profile;
        AuthService.isLoginLoading = false;
    });
    AuthService.registerAuthenticationListener();
    // Use the authManager from angular-jwt to check for
    // the user's authentication state when the page is
    // refreshed and maintain authentication
    authManager.checkAuthOnRefresh();
    // Listen for 401 unauthorized requests and redirect
    // the user to the login page
    authManager.redirectWhenUnauthenticated();
}
/* eslint-disable  */
/** @ngInject */
function AuthService($rootScope, authManager, toaster, ProfileService, $state, lock, $log, _, $location) {
    const vm = this;
    vm.profile = angular.fromJson(localStorage.getItem('profile')) || {};
    vm.login = login;
    vm.logout = logout;
    vm.registerAuthenticationListener = registerAuthenticationListener;
    vm.isOwner = isOwner;
    vm.isLoginLoading = false;
    vm.setProfile = setProfile;
    vm.isAuthenticated = isAuthenticated;

    function login() {
        lock.show();
    }

    function logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        authManager.unauthenticate();
        vm.profile = {};
        toaster.pop('success', '', 'Successfully Logout.');
    }

    function registerAuthenticationListener() {
        lock.on('authenticated', function (authResult) {
            localStorage.setItem('id_token', authResult.idToken);
            ProfileService.readMyProfile().then((response) => {
                localStorage.setItem('profile', angular.toJson(response.data));
                $rootScope.$broadcast('profileSet', response.data);
                authManager.authenticate();
                if (!response.data._isRegistered) {
                    toaster.pop('success', 'Welcome!', 'You do not seems to have an account, please take some time to do a quick registration.');
                    $state.go('profile.welcome');
                }
                else {
                    toaster.pop('success', '', 'Successfully Login.');
                    $state.go('profile.me');
                }
            });
        });
        lock.on('show', () => {
            vm.isLoginLoading = true;
        });
        lock.on('hide', () => {
            vm.isLoginLoading = false;
        });
        lock.on('unrecoverable_error', () => {
            vm.isLoginLoading = false;
        });
        lock.on('authorization_error', () => {
            vm.isLoginLoading = false;
        });
    }

    function isOwner(object) {
        return vm.profile && object && object.profile && (vm.profile._id === object.profile._id);
    }

    function setProfile(profile) {
        localStorage.setItem('profile', angular.toJson(profile));
        $rootScope.$broadcast('profileSet', profile);
    }

    function isAuthenticated() {
        return $rootScope.isAuthenticated;
    }
}
/** @ngInject */
function AuthResponseInterceptorService($q, toaster, authManager, $injector) {
    const vm = this;
    vm.responseError = responseError;

    function responseError(response) {
        if (response.status === 401) {
            localStorage.removeItem('id_token');
            localStorage.removeItem('profile');
            authManager.unauthenticate();
            $injector.get('$state').go('listing.browse', {}, {
                reload: true,
            });
            toaster.pop('warning', 'Opps!', 'Please sign in in order to access that page.');
            return $q.reject(response);
        }
        return $q.reject(response);
    }
}