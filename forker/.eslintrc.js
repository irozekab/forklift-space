module.exports = {
    extends: ["eslint-config-google", "eslint-config-hapi", ],
    rules: {
        // added
        'no-invalid-this': 0,
        'padded-blocks': 0,
        'indent': [1, 2],
        'array-bracket-spacing': [1, 'always'],
        'object-curly-spacing': [1, 'always'],
        'comma-dangle': [1, 'always'],
        'consistent-this': [1, 'that'],
        'no-multiple-empty-lines': [1, {
            'max': 1
        }],
        'handle-callback-err': 1,
        'func-style': 1,
        'require-jsdoc': 1,
    },
};