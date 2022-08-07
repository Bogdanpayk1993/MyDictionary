var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');

var usersRouter = require('./routes/users');
var wordsRouter = require('./routes/words');
var usersPostsRouter = require('./routes/usersposts'); 
var subscribersRouter = require('./routes/subscribers');
var commentsRouter = require('./routes/comments');
var likesRouter = require('./routes/likes');
var resultsTestsRouter = require('./routes/resultstests');
var taskForFriends = require('./routes/tasksforfriends');
var taskForFriendsWords = require('./routes/tasksforfriendswords');
var messages = require('./routes/messages');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use('/users', usersRouter);
app.use('/words', wordsRouter);
app.use('/usersposts', usersPostsRouter);
app.use('/subscribers', subscribersRouter);
app.use('/comments', commentsRouter);
app.use('/likes', likesRouter);
app.use('/resultstests', resultsTestsRouter);
app.use('/tasksforfriends', taskForFriends);
app.use('/tasksforfriendswords', taskForFriendsWords);
app.use('/messages', messages);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
