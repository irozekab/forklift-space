require('./style.scss');
angular.module('app').component('acme.landing', require('./components/landing')).component('acme.terms', require('./components/terms')).config(require('./routes'));