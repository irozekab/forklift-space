require('./style.scss');
angular.module('app').component('mail', {
    template: require('./template.html'),
    controller: MailController,
});
/** @ngInject */
function MailController(MailService, AppService) {
    const vm = this;
    vm.$onInit = () => {
        vm.mail = {};
        vm.fields = require('./fields');
        vm.postMail = postMail;
        vm.pending = false;
    };

    function postMail() {
        if (!vm.pending) {
            vm.pending = true;
            MailService.postMail(vm.mail).then(() => {
                vm.options.resetModel();
                AppService.scrollToTop();
            }).finally(() => {
                vm.pending = false;
            });
        }
    }
}