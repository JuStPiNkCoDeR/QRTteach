let express = require('express');
let router = express.Router();
let infoModel = require('../lib/mongooseModels').infoModel;
let testDataModel = require('../lib/mongooseModels').testDataModel;
let accountModel = require('../lib/mongooseModels').accountModel;

router.get('/', function (req, res) {
    let toSave = new infoModel({
        tempCount: 0,
        tempID: []
    });
    toSave.save(function (err) {
        if (err) console.log(err);
    })
});

module.exports = router;