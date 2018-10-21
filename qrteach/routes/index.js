let express = require('express');
let router = express.Router();
let conf = require('../config');
let fs = require('fs-extra');
let formidable = require('formidable');

router.get('/', function(req, res) {
    req.session.lang = conf.get('languages:ru');
    let langConf = req.session.lang;
    fs.readJson(langConf.index, (err, obj) => {
        if (err) console.log(err);
        else {
            res.render('index', {
                title: "QRTeach",
                lang: obj
            })
        }
    });
});

router.post('/getTest', function (req, res) {
    let langConf = req.session.lang;
    let form = new formidable.IncomingForm(conf.get('formidable:options'));
    let mongoose = require('../lib/mongoose')(true);
    let testDataModel = require('../lib/mongooseModels').testDataModel;
    form.parse(req, function (err, fields, files) {
        if (err) console.log(err);
        else {
            let testID = fields.id;
            testDataModel.findById(testID, function (err, obj) {
                if (err) console.log(err);
                else {
                    let testInfo = obj.testData;
                    if (langConf.index === undefined) req.session.lang = conf.get('languages:ru');
                    fs.readJson(langConf.index, (err, obj) => {
                        if (err) console.log(err);
                        else {
                            let template;
                            switch (testInfo.testOptions.type) {
                                case "simpleTest":
                                    template = 'simpleTest';
                                    break;
                                default:
                                    template = "Not found";
                                    break;
                            }
                            if (template === "Not found") console.log("GG");
                            else {
                                res.render(template, {
                                    lang: obj,
                                    test: testInfo
                                }, function (err, html) {
                                    if (err) console.log(err);
                                    else res.json({
                                        test:html,
                                        testObj: testInfo
                                    });
                                })
                            }
                        }
                    })
                }
            })
        }
    })
});

module.exports = router;
