var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var nodemailer   = require('nodemailer');

var routes = require('./routes/index');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/privacy-policy', routes);
app.use('/development-operations-qa', routes)
app.use('/containerize-your-platform',routes)

// app.post('/enviar', enviar);

app.post('/contact', function(req, res){
   
    console.dir(req.body);
    
    if (req.body.action_contact == 1){
    
    var smtpTransport = nodemailer.createTransport('smtps://correo@gmail.com:pass@smtp.gmail.com');
        
      var msg = 'Nombre :<b>' + req.body.Name+'</b><br />'+
                'Email :<b>' + req.body.Email+'</b><br />'+
                'Telefono :<b>' + req.body.Telephone+'</b><br />'+
                'Mesaje :<b>' + req.body.Message+'</b>'
        
      var mailOptions = {
        from: "correo@gmail.com", // sender address
    	to: 'correo@gmail.com', // list of receivers
    	subject: "Contacto desde la Web", // Subject line
    	html: msg // html body
      }

       smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                   res.send("ocurrio un error, intentalo mas tarde");
        	}else{
        	       res.render('contacto', { title: 'ENFORMAT - Software Development' , 'nameUser': req.body.Name });
        	}
       });
   }
     //res.end('ok');
});


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
