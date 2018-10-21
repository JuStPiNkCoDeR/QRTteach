let express = require('express');
let router = express.Router();
let conf = require('../config');
let fs = require('fs-extra');
let formidable = require('formidable');
let qrcode = require('qrcode');

router.get('/', function(req, res) {
    req.session.lang = conf.get('languages:ru');
    let langConf = req.session.lang;
    fs.readJson(langConf.create, (err, obj) => {
        if (err) console.log(err);
        else {
            res.render('create', {
                title: "QRTeach",
                lang: obj
            })
        }
    })
});

router.post('/QR', function (req, res) {
    let form = new formidable.IncomingForm(conf.get('formidable:options'));
    let mongoose = require('../lib/mongoose')(true);
    let infoModel = require('../lib/mongooseModels').infoModel;
    let testDataModel = require('../lib/mongooseModels').testDataModel;
    form.parse(req, function (err, fields, files) {
        if (err) console.log(err);
        else {
            let date = new Date();
            const dateFormat = conf.get('variables:DATE:format');
            let saveTest = new testDataModel({
                type: (fields.testOptions.isTemp) ? "temp":"saving",
                authID: "temp", /** Нужно заменять */
                testData: fields,
                date: date.toLocaleString("ru-RU", dateFormat)
            });
            saveTest.save(function (err, saved) {
                if (err) console.log(err);
                else {
                    let savedID = saved._id.toString();
                    qrcode.toString(savedID, {type: "svg"}, function (err, str) {
                        if (err) console.log(err);
                        else res.json({QR:str});
                    });
                    if (saved.type === "temp") {
                        infoModel.find({}).exec(function (err, out) {
                            if (err) console.log(err);
                            else {
                                let curCount = out[0].tempCount+=1;
                                out[0].tempID.push(savedID);
                                console.log(out[0].tempID);
                                infoModel.updateMany({}, {
                                    tempCount: curCount,
                                    tempID: out[0].tempID
                                }, function (err) {
                                    if (err) console.log(err);
                                })
                            }
                        });
                    }
                }
            })
        }
    })
});

module.exports = router;