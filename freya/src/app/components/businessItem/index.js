require('./style.scss');
/* eslint-disable  */
angular.module('app').component('businessItem', {
    template: require('./template.html'),
    bindings: {
        model: '<',
    },
});