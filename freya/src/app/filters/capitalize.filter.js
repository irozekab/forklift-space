angular.module('app').filter('capitalize', capitalize);

function capitalize() {
    return function (input) {
        if (input) {
            return input.charAt(0).toUpperCase() + input.substr(1).toLowerCase();
        }
        return '';
    };
}