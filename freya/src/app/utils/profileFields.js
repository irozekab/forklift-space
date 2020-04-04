module.exports = [{
    fieldGroup: [{
        key: 'name',
        type: 'input',
        templateOptions: {
            label: 'Name',
            type: 'text',
            required: true,
        },
    }, {
        key: 'email',
        type: 'input',
        templateOptions: {
            label: 'Email',
            type: 'email',
            required: true,
            addonLeft: {
                text: '@',
            },
        },
    }, {
        key: 'contactNumber',
        type: 'input',
        templateOptions: {
            label: 'Contact Number',
            type: 'string',
            addonLeft: {
                class: 'ion-iphone',
            },
        },
        /*
        validators: {
          test: function ($viewValue, $modelValue) {

            var value = $modelValue || $viewValue;

            if (value) {
              return true;
            }
          },
        },
        */
    }, {
        key: 'remarks',
        type: 'textarea',
        templateOptions: {
            label: 'Remarks',
            rows: 10,
            placeholder: 'Anything you want to say...',
        },
    }, ],
}, ];