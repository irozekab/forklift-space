/* eslint-disable  */
angular.module('app').directive('onEnter', () => {
    return function (scope, element, attributes) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(() => {
                    scope.$eval(attributes.onEnter);
                });
                event.preventDefault();
            }
        });
    };
});