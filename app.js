var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const fs =require('fs');
hbs = require('express-handlebars');
var app = express();
const flash = require('connect-flash');

app.use(require('express-session')({secret: 'ThisIsASecretActivityCentre', resave: false, saveUninitialized: false}));
app.use(flash());

require('./app/config/passport')(passport);
// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine( 'hbs', hbs( { 
  extname: 'hbs', 
  defaultLayout: 'layout', 
  layoutsDir: __dirname + '/views/',
  partialsDir: __dirname + '/views/partials/'
} ) );

app.set( 'view engine', 'hbs' );

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);

//global Vars
app.use((req, res, next)=> {
  res.locals.errors =req.flash('error_msg');
  next();
});







// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next();
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//updated`

module.exports = app;
