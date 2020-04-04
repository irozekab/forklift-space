angular.module('app').service('MailService', MailService);
/** @ngInject */
function MailService($http, toaster, $log) {
    const vm = this;
    vm.postMail = postMail;

    function postMail(mail) {
        return $http.post('/api/mails', mail).then((response) => {
            toaster.pop('success', 'Thank you', 'We have receive your mail and will get back to you shortly.');
            return response.data;
        }, (response) => {
            $log.error(response);
            toaster.pop('error', response.status + ': ' + response.statusText, 'Please refresh the page or try again later.');
            $log.error('Error: postMail()');
            throw response;
        });
    }
}