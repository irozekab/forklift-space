module.exports = routesConfig;
/** @ngInject */
function routesConfig($stateProvider) {
    $stateProvider.state('directory.read', {
        url: '/:category/:subCategory',
        component: 'directory.read',
        onEnter: onEnterDirectoryRead,
        onExit: onExitDirectoryRead,
    }).state('directory.browse', {
        url: '',
        component: 'directory.browse',
        resolve: {
            directoryCategories: resolveDirectoryCategoriesController,
        },
    }).state('directory', {
        url: '/directory',
        abstract: true,
        parent: 'default',
        template: '<ui-view></ui-view>',
    });
}
/** @ngInject */
function resolveDirectoryCategoriesController(DirectoryCategoryService) {
    return DirectoryCategoryService.browseDirectoryCategories().then((response) => {
        //eslint-disable-next-line
        return _.sortBy(response.data.directoryCategories, function (directoryCategory) {
            return directoryCategory.slug !== 'others';
        });
    });
}
/** @ngInject */
function onEnterDirectoryRead($stateParams, ngMeta, variables) {
    const category = $stateParams.category;
    let subCategory = $stateParams.subCategory;
    let title = variables.title;
    let titleSuffix = variables.titleSuffix;
    let description = variables.description;
    let keywords = variables.keywords;
    subCategory = subCategory.split('-').join(' ');
    subCategory = subCategory.charAt(0).toUpperCase() + subCategory.slice(1);
    if (category && subCategory) {
        switch (category) {
            case 'appointed-dealers':
                title = subCategory + ' Dealer in Singapore';
                description = 'Looking for ' + subCategory + ' Forklift Dealers? We have a list of ' + subCategory + ' dealers in Singapore.';
                keywords += subCategory + ' forklift dealer,';
                break;
            case 'repair':
                title = subCategory + ' Repair in Singapore';
                titleSuffix = '';
                description = 'Looking for ' + subCategory + ' repair dealer in Singapore? Search through our list of dealers in Singapore.';
                keywords += subCategory + ' Repair in Singapore,';
                break;
            default:
                break;
        }
    }
    ngMeta.setTitle(title, titleSuffix);
    ngMeta.setTag('description', description);
    ngMeta.setTag('keywords', keywords);
}
/** @ngInject */
function onExitDirectoryRead(ngMeta, variables) {
    ngMeta.setTitle(variables.title, variables.titleSuffix);
    ngMeta.setTag('description', variables.description);
    ngMeta.setTag('keywords', variables.keywords);
}