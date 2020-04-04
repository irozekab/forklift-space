/* eslint-disable  */
var environment = window.document.getElementsByTagName('meta').environment.content === '{{environment}}' ? 'local' : window.document.getElementsByTagName('meta').environment.content;
module.exports = {
    uri: window.location.origin,
    environment: environment,
    cloudinary: {
        url: 'https://api.cloudinary.com/v1_1/itsykumo/image/upload',
        upload_preset: 'forker',
    },
    logo: 'https://res.cloudinary.com/itsykumo/image/upload/v1479457243/forker/development/logo.png',
    title: 'Forklift For Sales in Singapore',
    titleSuffix: ' | Best Competitive Rates in Town',
    description: 'DeXufto has one of the widest range of quality and reliable forklifts in Singapore. Contact us now!',
    keywords: 'forklift, pallet jack, ',
};