module.exports = run;
/** @ngInject */
function run($transitions, $document, $state, AuthService, AppService, toaster, $timeout, $location, ngMeta, variables) {
    $transitions.onBefore({
        to(state) {
            if (state.data) {
                return state.data.authenticate;
            }
            return false;
        },
    }, () => {
        if (AuthService.isAuthenticated()) {
            return;
        }
        toaster.pop('warning', 'Opps!', 'Please sign in in order to access that page.');
        $state.go('home');
    });
    $transitions.onEnter({}, () => {
        AppService.scrollToTop();
        $timeout(() => {
            $location.hash('');
        });
        return;
    });
    $transitions.onError({}, () => {});
    ngMeta.init();
    ngMeta.setTitle(variables.title);
    ngMeta.setDefaultTag('description', variables.description);
    ngMeta.setDefaultTag('keywords', variables.keywords);
}