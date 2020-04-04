require('./style.scss');
angular.module('app').component('directory.browse', require('./components/browse')).component('directory.read', require('./components/read')).config(require('./routes'));