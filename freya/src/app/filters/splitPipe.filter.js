import _ from 'lodash';
angular.module('app').filter('splitPipe', splitPipe);

function splitPipe() {
    return (input) => {
        if (input) {
            return _.replace(input, '|', ' - ');
        }
        return '';
    };
}