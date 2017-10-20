"use strict";

var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var https        = require('https');
var sendmail     = require('sendmail')({
                          logger: {
                            debug: console.log,
                            info: console.info,
                            warn: console.warn,
                            error: console.error
                          },
                          silent: false});

var routes = require('./routes/index');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'public/views'));
app.set('view engine', 'jade');

app.use(favicon('public/images/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/index', routes);
app.use('/privacy-policy', routes);
app.use('/development-operations-qa', routes)
app.use('/containerize-your-platform',routes)

app.post('/contact', function(req, res){
   
    console.dir(req.body);
    
    if (req.body.action_contact == 1){
      verifyRecaptcha(req.body["g-recaptcha-response"], function(success) {
                if (success) {
                  //recaptcha OK
                  var msg = 'Name :<b>' + req.body.Name+'</b><br />'+
                  'Email :<b>' + req.body.Email+'</b><br />'+
                  'Phone :<b>' + req.body.Telephone+'</b><br />'+
                  'Message :<b>' + req.body.Message +'</b>';
          
                  sendmail({
                    from: "no-reply@enformat.cat", // sender address
                  to: 'info@enformat.cat', // list of receivers
                  subject: "Contact from website", // Subject line
                  html: msg // html body
                  }, function(err, reply) {
                    console.log(err && err.stack);
                    console.dir(reply);
                  });
                } 
                else 
                {
                  //recaptcha KO
                  res.redirect(401, 'back');
                }
        });
   }

   res.redirect(200, 'back');
});


var SECRET = "6LcM8DQUAAAAADxYIO2KLCPbBC-Dr4UE-tqZxY04";
// Helper function to make API call to recatpcha and check response
function verifyRecaptcha(key, callback) {
        https.get("https://www.google.com/recaptcha/api/siteverify?secret=" + SECRET + "&response=" + key, function(res) {
                var data = "";
                res.on('data', function (chunk) {
                        data += chunk.toString();
                });
                res.on('end', function() {
                        try {
                                var parsedData = JSON.parse(data);
                                callback(parsedData.success);
                        } catch (e) {
                                callback(false);
                        }
                });
        });
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

 

// error handlers

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
