angular.module('app').service('BusinessService', BusinessService);
/** @ngInject */
function BusinessService($http, toaster) {
    const vm = this;
    vm.browseBusinesses = browseBusinesses;

    function browseBusinesses(params) {
        return $http({
            method: 'GET',
            url: '/api/businesses',
            params,
        }).then((response) => {
            return response;
        }, (response) => {
            toaster.pop('error', response.status + ': ' + response.statusText, 'Please refresh the page or try again later.');
            throw response;
        });
    }
}