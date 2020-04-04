module.exports = [{
    key: 'name',
    type: 'input',
    templateOptions: {
        placeholder: 'Your Name',
        type: 'text',
        required: true,
    },
}, {
    key: 'email',
    type: 'input',
    templateOptions: {
        placeholder: 'Email',
        type: 'email',
        required: true,
    },
}, {
    key: 'body',
    type: 'textarea',
    templateOptions: {
        placeholder: 'Body',
        required: true,
        rows: 8,
    },
}, ];