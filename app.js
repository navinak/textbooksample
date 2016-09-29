var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db=require('./model/db');
var routes = require('./routes/index');
var users = require('./routes/users');
var user=require('./routes/user');
var project=require('./routes/project');


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

//app.use('/', routes);
app.use('/users', users);


app.get('/', routes);
// USER ROUTES*/
app.get('/user', user.index);

// Current user profile
app.get('/user/new', user.create);
// Create new user form
app.post('/user/new', user.doCreate); // Create new user action
/*app.get('/user/edit', user.edit);
// Edit current user form
app.post('/user/edit', user.doEdit);
// Edit current user action
app.get('/user/delete', user.confirmDelete); // delete current
//user form
app.post('/user/delete', user.doDelete);
// Delete current
//user action
app.get('/login', user.login);
// Login form
app.post('/login', user.doLogin);
// Login action
app.get('/logout', user.doLogout);
// Logout current user*/





/*app.get('/project/new', project.create);
app.post('/project/new', project.doCreate);
app.get('/project/:id', project.displayInfo); // Display project
//info
app.get('/project/edit/:id', project.edit);
// Edit selected
//project form
app.post('/project/edit/:id', project.doEdit);// Edit selected
//project action
app.get('/project/delete/:id', project.confirmDelete);// Delete
// selected product form
app.post('/project/delete/:id', project.doDelete);
// Delete
//selected project action*/


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
