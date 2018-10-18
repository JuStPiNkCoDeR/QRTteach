let express = require('express');
let router = express.Router();
let conf = require('../config');
let fs = require('fs-extra');
let formidable = require('formidable');

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
    form.parse(req, function (err, fields, files) {
        if (err) console.log(err);
        console.dir(fields);
    })
});

module.exports = router;