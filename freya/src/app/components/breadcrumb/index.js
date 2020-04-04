require('./style.scss');
angular.module('app').component('breadcrumb', {
    template: require('./template.html'),
    controller: BreadcrumbController,
    bindings: {
        crumbs: '<',
    },
});
/** @ngInject */
function BreadcrumbController() {}