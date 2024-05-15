// Imports
const express = require('express');
const createError = require('http-errors');
const path = require('path'); // file and directory path parser
const cookieParser = require('cookie-parser');
const logger = require('morgan'); // http request logger
const compression = require('compression'); // compress data sent
const helmet = require('helmet');
const rateLimiter = require('express-rate-limit');

// Express app
const app = express();

// Setup Mongoose connection
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routing
const limiter = rateLimiter({
  windowMs: 1 * 60 * 1000, // 1 minutes
  max: 10000
});
app.use(limiter);
app.use(helmet());
app.use(compression());

const indexRouter = require('./routes/index');
const gamesRouter = require('./routes/games');
app.use('/', indexRouter);
app.use('/games', gamesRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Export
module.exports = app;