const mongoose = require('mongoose');
const config = require('../config');

module.exports = function (type) {
    if (type) {
        mongoose.connect(config.get('mongoose:dataBase'), config.get('mongoose:options'), function (err) {
            if (err) console.log(err);
        });
    } else {

    }
};