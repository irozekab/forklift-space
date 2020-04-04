angular.module('app').service('ProfileService', ProfileService);
/** @ngInject */
function ProfileService($http, toaster) {
    const vm = this;
    vm.readProfile = readProfile;
    vm.editMyProfile = editMyProfile;
    vm.readMyProfile = readMyProfile;
    vm.fields = require('../utils/profileFields');

    function readProfile(id) {
        return $http({
            method: 'GET',
            url: '/api/profiles/' + id,
        }).then((response) => {
            return response.data;
        }, (response) => {
            throw response;
        });
    }

    function editMyProfile(profile) {
        return $http({
            method: 'PUT',
            url: '/api/profiles/me',
            data: profile,
        }).then((response) => {
            toaster.pop('success', '', 'Profile has been updated.');
            return response;
        }, (response) => {
            toaster.pop('error', response.status + ': ' + response.statusText, 'Please refresh the page or try again later.');
            throw response;
        });
    }

    function readMyProfile() {
        return $http({
            method: 'GET',
            url: '/api/profiles/me',
        }).then((response) => {
            return response;
        }, (response) => {
            toaster.pop('error', response.status + ': ' + response.statusText, 'Please refresh the page or try again later.');
            throw response;
        });
    }
}