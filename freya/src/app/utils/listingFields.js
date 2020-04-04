import _ from 'lodash';
import filterOptions from './listingFilterOptions';
module.exports = [{
    fieldGroup: [{
        key: 'brand',
        type: 'select',
        templateOptions: {
            label: 'Brand',
            required: true,
            options: _.map(filterOptions.brand.options, (b) => {
                return {
                    name: b.charAt(0).toUpperCase() + b.substr(1).toLowerCase(),
                    value: b,
                };
            }),
        },
    }, {
        key: 'model',
        type: 'input',
        templateOptions: {
            label: 'Model',
            type: 'text',
            required: true,
        },
    }, {
        key: 'currency',
        type: 'radio',
        templateOptions: {
            label: 'Currency',
            required: true,
            options: _.map(filterOptions.currency.options, (b) => {
                return {
                    name: b.toUpperCase(),
                    value: b,
                };
            }),
        },
    }, {
        key: 'price',
        type: 'input',
        templateOptions: {
            label: 'Price',
            type: 'number',
            required: true,
        },
        validators: {
            min($viewValue, $modelValue) {
                const value = $modelValue || $viewValue;
                return Boolean(value) && value >= 1;
            },
        },
        validation: {
            messages: {
                min(value) {
                    return value + ' is not a valid price. Please enter an amount greater than 0.';
                },
            },
        },
    }, {
        key: 'truck',
        type: 'select',
        templateOptions: {
            label: 'Truck',
            required: true,
            options: _.map(filterOptions.truck.options, (b) => {
                return {
                    name: b.charAt(0).toUpperCase() + b.substr(1).toLowerCase(),
                    value: b,
                };
            }),
        },
    }, {
        key: 'ratedLoadingCapacity',
        type: 'input',
        templateOptions: {
            label: 'Rated Loading Capacity',
            type: 'number',
            required: true,
            addonRight: {
                text: 'ton',
            },
        },
        validators: {
            min($viewValue, $modelValue) {
                const value = $modelValue || $viewValue;
                return Boolean(value) && value >= 0;
            },
        },
    }, {
        key: 'motor',
        type: 'select',
        templateOptions: {
            label: 'Motor',
            required: true,
            options: _.map(filterOptions.motor.options, (b) => {
                return {
                    name: b.charAt(0).toUpperCase() + b.substr(1).toLowerCase(),
                    value: b,
                };
            }),
        },
    }, ],
}, {
    template: '<hr class="black" /><h4 class="m-t-xs m-b-lg">Optional Information</h4>',
}, {
    fieldGroup: [{
        key: 'yearOfManufacture',
        type: 'input',
        templateOptions: {
            label: 'Year of Manufacture',
            type: 'number',
        },
        validators: {
            year($viewValue, $modelValue) {
                const value = $modelValue || $viewValue;
                const regex = /^(18|19|20)\d{2}$/;
                return !value || regex.test(value);
            },
        },
        validation: {
            messages: {
                year() {
                    return 'Please enter a valid year.';
                },
            },
        },
    }, {
        key: 'hoursUsed',
        type: 'input',
        templateOptions: {
            label: 'Hours Used',
            type: 'number',
            addonRight: {
                text: 'hours',
            },
        },
        validators: {
            min($viewValue, $modelValue) {
                const value = $modelValue || $viewValue;
                return !value || value >= 0;
            },
        },
    }, {
        key: 'sideShift',
        type: 'radio',
        templateOptions: {
            label: 'Side Shift',
            options: _.map(filterOptions.sideShift.options, (b) => {
                return {
                    name: b.charAt(0).toUpperCase() + b.substr(1).toLowerCase(),
                    value: b,
                };
            }),
        },
    }, {
        key: 'mastStage',
        type: 'radio',
        templateOptions: {
            label: 'Mast Stage',
            options: _.map(filterOptions.mastStage.options, (b) => {
                return {
                    name: b.charAt(0).toUpperCase() + b.substr(1).toLowerCase(),
                    value: b,
                };
            }),
        },
    }, {
        key: 'serialNumber',
        type: 'input',
        templateOptions: {
            label: 'Serial Number',
            type: 'text',
        },
    }, {
        key: 'mastHeight',
        type: 'input',
        templateOptions: {
            label: 'Mast Height',
            type: 'number',
            addonRight: {
                text: 'mm',
            },
        },
        validators: {
            min($viewValue, $modelValue) {
                const value = $modelValue || $viewValue;
                return !value || value >= 0;
            },
        },
    }, {
        key: 'liftingHeight',
        type: 'input',
        templateOptions: {
            label: 'Lifting Height',
            type: 'number',
            addonRight: {
                text: 'mm',
            },
        },
        validators: {
            min($viewValue, $modelValue) {
                const value = $modelValue || $viewValue;
                return !value || value >= 0;
            },
        },
    }, {
        key: 'forkLength',
        type: 'input',
        templateOptions: {
            label: 'Fork Length',
            type: 'number',
            addonRight: {
                text: 'mm',
            },
        },
        validators: {
            min($viewValue, $modelValue) {
                const value = $modelValue || $viewValue;
                return !value || value >= 0;
            },
        },
    }, {
        key: 'remarks',
        type: 'textarea',
        templateOptions: {
            label: 'Remarks',
            rows: 10,
            placeholder: 'Painwork, Wear and Tear level on tyres etc ...',
        },
    }, ],
}, ];