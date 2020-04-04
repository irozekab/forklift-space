angular.module('app').service('DirectoryCategoryService', DirectoryCategoryService);
/** @ngInject */
function DirectoryCategoryService($http, toaster) {
    const vm = this;
    vm.browseDirectoryCategories = browseDirectoryCategories;

    function browseDirectoryCategories() {
        return $http({
            method: 'GET',
            url: '/api/directory-categories',
        }).then((response) => {
            return response;
        }, (response) => {
            toaster.pop('error', response.status + ': ' + response.statusText, 'Please refresh the page or try again later.');
            throw response;
        });
    }
}