var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressLayouts = require('express-ejs-layouts');
var session = require('express-session');
var Admin = require('./models/admin');
var index = require('./routes/index');

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/issueRegister');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(session({
  secret: 'rgsocrejected',
  resave: false,
  saveUninitialized: true
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

Admin.findOne({},function(err,admin){
  if(err){
    console.log(err);
  }else{
    console.log(admin);
    if(!admin){
      console.log("No admin account found. Creating one.");
      var newadmin = new Admin({
        admin : 'zairza',
        password : 'pronoob17'
      });
      newadmin.save(function(err){
        if(err){
          console.log(err);
        }else {
          console.log("Admin account created");
        }
      })
    }else {
      console.log("Admin account already created");
    }
  }
})
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
