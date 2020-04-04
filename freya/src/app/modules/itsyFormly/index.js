require('./style.scss');
angular.module('itsyFormly', ['formly', 'formlyBootstrap', ]).config(config);
/** @ngInject */
function config(formlyConfigProvider) {
    formlyConfigProvider.setWrapper({
        name: 'loader',
        template: require('./loader.wrapper.html'),
    });
    formlyConfigProvider.setType({
        name: 'input-loader',
        extends: 'input',
        wrapper: ['loader', ],
    });
    formlyConfigProvider.setType({
        name: 'radio',
        overwriteOk: true,
        template: require('./radio.html'),
        wrapper: ['bootstrapLabel', 'bootstrapHasError', ],
        defaultOptions: {
            noFormControl: false,
        },
        apiCheck(check) {
            return {
                templateOptions: {
                    options: check.arrayOf(check.object),
                    labelProp: check.string.optional,
                    valueProp: check.string.optional,
                    inline: check.bool.optional,
                },
            };
        },
    });
    formlyConfigProvider.setWrapper({
        template: require('./error.wrapper.html'),
        types: ['input', 'checkbox', 'select', 'textarea', 'radio', 'input-loader', 'checkbox-customLabel', ],
    });
}