'use strict';
const _ = require('lodash');
module.exports = function (Mongoose) {
    const DirectoryCategory = Mongoose.models.DirectoryCategory;
    const Business = Mongoose.models.Business;
    seedDirectoryCategories(DirectoryCategory, () => {
        seedBusinesses(Business, DirectoryCategory);
    });
};
const seedDirectoryCategories = function (DirectoryCategory, callback) {
    const directoryCategories = (require('./directory')).directoryCategories;
    DirectoryCategory.find({}).remove(() => {
        var count = directoryCategories.length;
        console.log(count);
        _.each(directoryCategories, (directoryCategory) => {
            DirectoryCategory.create(directoryCategory._subCategories, (_error, _subCategories) => {
                if (_error) {
                    console.error(_error);
                }
                directoryCategory.subCategories = _subCategories;
                var parent = new DirectoryCategory(directoryCategory);
                parent.save();
                count--;
                if (count <= 0) {
                    callback();
                    console.log('Finished seeding Directory Category.');
                }
            });
        });
    });
};
const seedBusinesses = function (Business, DirectoryCategory) {
    const businesses = (require('./directory')).businesses;
    DirectoryCategory.find({}, (error, directoryCategories) => {
        _.each(businesses, (business) => {
            business.categories = [];
            _.each(business._categories, (_category) => {
                var slug = _category.split('|')[1];
                var directoryCategory = _.find(directoryCategories, (directoryCategory) => {
                    return directoryCategory.slug == slug && directoryCategory.subCategories.length == 0;
                });
                business.categories.push(directoryCategory);
            });
        });
        Business.find({}).remove(() => {
            Business.create(businesses, (_error, _businesses) => {
                if (_error) {
                    console.error(_error);
                }
                console.log('Finished seeding Business.');
            });
        });
    });
};