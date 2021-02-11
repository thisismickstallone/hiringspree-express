var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

// define routes
var openJobsToday = require("./routes/openjobstoday");
var openJobsYesterday = require("./routes/openjobsyesterday");
var allOpenJobsYesterday = require("./routes/allopenjobsyesterday");
var hud = require("./routes/hud");
var fresh = require("./routes/fresh");

// initialize express app
var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// use routes
app.use("/", openJobsToday);
app.use("/", openJobsYesterday);
app.use("/", allOpenJobsYesterday);
app.use("/", hud);
app.use("/", fresh);

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
  res.json({
    message: err.message,
    error: err
  });
});

module.exports = app;
