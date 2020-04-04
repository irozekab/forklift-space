'use strict';
const _ = require('lodash');
const Moment = require('moment');
const Faker = require('faker');
module.exports = function (Mongoose) {
    const Profile = Mongoose.models.Profile;
    const Listing = Mongoose.models.Listing;
    const DirectoryCategory = Mongoose.models.DirectoryCategory;
    const Business = Mongoose.models.Business;
    seedProfiles(Profile, (profiles) => {
        seedListings(Listing, profiles);
    });
    seedDirectoryCategories(DirectoryCategory, () => {
        seedBusinesses(Business, DirectoryCategory);
    });
};
const seedProfiles = function (Profile, callback) {
    const profiles = [];
    _.times(20, () => {
        const profile = {
            name: Faker.name.firstName() + ' ' + Faker.name.lastName(),
            email: Faker.internet.email(),
            contactNumber: Faker.phone.phoneNumberFormat(),
        };
        profiles.push(profile);
    });
    profiles.push({
        name: 'Sean Su',
        email: 'itsykumo@gmail.com',
        contactNumber: '7783174118',
        identities: ['google-oauth2|100718397695630978686', ],
    });
    profiles.push({
        name: 'San Chua',
        email: 'san_chua@yahoo.com.sg',
        contactNumber: Faker.phone.phoneNumberFormat(),
    });
    profiles.push({
        name: 'Alvin',
        email: 'alvin@gmail.com',
        contactNumber: Faker.phone.phoneNumberFormat(),
    });
    profiles.push({
        name: 'Betty',
        email: 'betty@gmail.com',
        contactNumber: Faker.phone.phoneNumberFormat(),
    });
    profiles.push({
        name: 'Carol',
        email: 'carol@gmail.com',
        contactNumber: Faker.phone.phoneNumberFormat(),
    });
    profiles.push({
        name: 'Desmond',
        email: 'desmond@gmail.com',
        contactNumber: Faker.phone.phoneNumberFormat(),
    });
    Profile.find({}).remove(() => {
        Profile.create(profiles, (_error, _profiles) => {
            if (_error) {
                console.error(_error);
            }
            console.log('Finished seeding Profile.');
            callback(_profiles);
        });
    });
};
const seedListings = function (Listing, profiles) {
    const photos = ['http://res.cloudinary.com/itsykumo/image/upload/v1476245820/tools/626x623_x9z6t9.jpg', 'http://res.cloudinary.com/itsykumo/image/upload/v1476245820/tools/259x259_merqja.jpg', 'http://res.cloudinary.com/itsykumo/image/upload/v1476245820/tools/241x190_yewx2f.jpg', 'http://res.cloudinary.com/itsykumo/image/upload/v1476245821/tools/666x320_gsj5f3.jpg', 'http://res.cloudinary.com/itsykumo/image/upload/v1476245819/tools/93x75_ob3gjr.jpg', 'http://res.cloudinary.com/itsykumo/image/upload/v1476245820/tools/346x254_luiawk.jpg', 'http://res.cloudinary.com/itsykumo/image/upload/v1476245819/tools/108x75_lffcoz.jpg', 'http://res.cloudinary.com/itsykumo/image/upload/v1476245821/tools/700x535_wlqx8k.jpg', ];
    const brands = ['toyota', 'nissan', 'crown', 'jungheinrich', 'caterpillar', 'bt', 'still', 'yale', 'nichiyu', 'komatsu', 'hyster', 'linde', 'tcm', 'raymond', 'mitsubishi', ];
    const motors = ['electric', 'diesel', 'lpg', ];
    const mastStages = ['stage 1', 'stage 2', 'stage 3', ];
    const trucks = ['power pallet truck', 'stacker', 'forklift', 'reach truck', 'vna', ];
    const sideShifts = ['yes', 'no', 'not applicable', ];
    Listing.find({}).remove(() => {
        const years = _.range(1980, new Moment().year());
        _.times(300, () => {
            const photoCount = _.random(1, photos.length - 1);
            new Listing({
                model: Faker.commerce.productName(),
                profile: _.sample(profiles),
                price: Faker.finance.amount(),
                ratedLoadingCapacity: Faker.random.number(),
                yearOfManufacture: _.sample(years),
                serialNumber: Faker.random.uuid(),
                mastHeight: Faker.random.number(),
                liftingHeight: Faker.random.number(),
                forkLength: Faker.random.number(),
                sideShift: _.sample(sideShifts),
                mastStage: _.sample(mastStages),
                hoursUsed: Faker.random.number(),
                remarks: Faker.lorem.paragraph(),
                brand: _.sample(brands),
                motor: _.sample(motors),
                truck: _.sample(trucks),
                photos: _(photos).shuffle().take(photoCount).value(),
                mainPhotoIndex: _.random(photoCount - 1),
                isPublished: true,
            }).save();
        });
        console.log('Finished seeding Listing.');
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