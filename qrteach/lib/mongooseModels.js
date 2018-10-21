let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let infoSchema = new Schema({
    tempCount: {
        type: Number
    },
    tempID: {
        type: Array
    }
});
let accountSchema = new Schema({
    name: {
        type: String
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    testID: {
        type: Array
    }
});
let testDataSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    authID: {
        type: String,
        required: true
    },
    testData: {
        type: Object,
        required: true
    },
    date: {
        type: String
    }
});

let infoModel = mongoose.model('info', infoSchema);
let accountModel = mongoose.model('account', accountSchema);
let testDataModel = mongoose.model('test', testDataSchema);

module.exports.infoModel = infoModel;
module.exports.accountModel = accountModel;
module.exports.testDataModel = testDataModel;