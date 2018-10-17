let express = require('express');
let router = express.Router();
let conf = require('../config');
let fs = require('fs-extra');

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

module.exports = router;