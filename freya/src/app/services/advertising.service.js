angular.module('app').service('AdvertisingService', AdvertisingService);
/** @ngInject */
function AdvertisingService($sce, $document) {
    const vm = this;
    vm.bannerIndex = 0;
    vm.contentIndex = 0;
    vm.readNextBanner = readNextBanner;
    vm.readNextContent = readNextContent;
    vm.advertisings = [{
        banner: {
            src: $sce.trustAsResourceUrl('https://embed.bannerflow.com/iframe?placement=577852a526bee516cc1263ab&responsive=on&targeturl=http%3A%2F%2Fgoogle.com'),
            width: 240,
            height: 400,
        },
        content: {
            src: $sce.trustAsResourceUrl('https://embed.bannerflow.com/iframe?placement=57873b9c26bee54dbc1ce209&responsive=on&targeturl=http%3A%2F%2Fgoogle.com'),
            width: 300,
            height: 100,
        },
    }, ];

    function readNextBanner() {
        const advertising = vm.advertisings[vm.bannerIndex];
        vm.bannerIndex++;
        if (advertising) {
            advertising.banner = setBannerAspectHeight(advertising.banner);
            advertising.content = setContentAspectHeight(advertising.content);
        }
        return advertising;
    }

    function readNextContent() {
        const advertising = vm.advertisings[vm.contentIndex];
        vm.contentIndex++;
        if (advertising) {
            advertising.banner = setBannerAspectHeight(advertising.banner);
            advertising.content = setContentAspectHeight(advertising.content);
        }
        return advertising;
    }

    function setBannerAspectHeight(banner) {
        const element = angular.element($document[0].querySelectorAll('.advertisings-banner'))[0];
        if (element) {
            const ratio = element.clientWidth / banner.width;
            banner.aspectHeight = ratio * banner.height;
        }
        return banner;
    }

    function setContentAspectHeight(content) {
        const element = angular.element($document[0].querySelectorAll('.advertisings-content'))[0];
        if (element) {
            const ratio = element.clientWidth / content.width;
            content.aspectHeight = ratio * content.height;
        }
        return content;
    }
}