let express = require('express');
let path = require('path');
let favicon = require('static-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let conf = require('./config');
let session = require('express-session');
//let bodyParser = require('body-parser');

let index = require('./routes/index');
let create = require('./routes/create');

let app = express();

// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views/templates'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: conf.get('session:secret'),
    resave: false,
    secure: false,
    saveUninitialized: true,
    key: conf.get('session:key'),
    cookie: conf.get('session:cookie')
}));

app.use('/', index);
app.use('/create', create);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
