// var moment = require('moment');
// var _ = require('lodash');
module.exports = {
    brand: {
        options: ['toyota', 'nissan', 'crown', 'jungheinrich', 'caterpillar', 'bt', 'still', 'yale', 'nichiyu', 'komatsu', 'hyster', 'linde', 'tcm', 'raymond', 'mitsubishi', ],
    },
    motor: {
        options: ['electric', 'diesel', 'lpg', ],
    },
    truck: {
        options: ['power pallet truck', 'stacker', 'forklift', 'reach truck', 'vna', ],
    },
    sideShift: {
        options: ['yes', 'no', 'not applicable', ],
    },
    mastStage: {
        options: ['stage 1', 'stage 2', 'stage 3', ],
    },
    /*
    yearOfManufacture: {
      options: _.range(moment().year(), 1983, -1),
    },
    */
    currency: {
        options: ['sgd', 'usd', 'euro', ],
    },
};