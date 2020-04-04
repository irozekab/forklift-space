module.exports = {
    template: require('./template.html'),
    controller: AcmeLandingController,
};
/** @ngInject */
function AcmeLandingController() {
    const vm = this;
    vm.$onInit = () => {
        vm.interval = 3000;
        vm.active = 0;
        vm.slides = [{
            src: 'https://res.cloudinary.com/itsykumo/image/upload/v1479457243/forker/development/logo.png',
            id: 0,
        }, {
            src: 'https://store.storeimages.cdn-apple.com/4974/as-images.apple.com/is/image/AppleInc/aos/published/images/m/ac/macmini/select/macmini-select-box-201504?wid=330&hei=341&fmt=png-alpha&qlt=95&.v=Cotl32',
            id: 1,
        }, {
            src: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Apple_Watch-.jpg',
            id: 2,
        }, ];
    };
}