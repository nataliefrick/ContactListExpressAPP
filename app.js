// automatic code generated from express
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// my code starts here:
// if (process.env.NODE_ENV !== "production") {
//   require('dotenv').config()
// }

var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('ServerStarted'));

// connect to mongoDB
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

// fetch url for database from .env file:
//mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true }) 
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

// create events to ensure database connected correctly
db.on('error', (error) => console.error(error)) // on error => report
db.on('open', () => console.log('Connected to Database')) // on successful login => report

// set up server to accept json files
app.use(express.json())

// set up routes
var indexRouter = require('./routes/index');
var contactListRouter = require('./routes/contactList');

// url: localhost:3000/contacts/

app.use('/', indexRouter);
app.use('/contacts', contactListRouter);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



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
