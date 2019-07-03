//// Modules
require('env-smart').load(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();

// Routes
const indexRoute = require('./components/base/index.js');
const bookRoute = require('./components/book/book.route')(app);
const institutionRoute = require('./components/institution/institution.route')(app);
const userRoute = require('./components/user/user.route')(app);

//// Mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('Connected to database'))
  .catch(err => console.error(err));

//// Middleware
// Logging
app.use(morgan('dev'));
// Parsing
app.use(express.urlencoded({ extended: true })); // true to support arrays
app.use(express.json());
// Passport
const passport = require('./components/passport/passport')(app);

//// Routes
app.get('/', indexRoute);
app.use('/books', passport.authenticate('jwt', { session: false, failureRedirect: '/' }), bookRoute);
app.use('/institution', institutionRoute);
app.use('/users', userRoute);

//// Errors
app.use((err, req, res, next) => {
  const { message, code, data } = err;
  if (message) console.error(JSON.stringify(message, null, 2));
  if (code) console.error(JSON.stringify(code, null, 2));
  if (data) console.error(data);
  next(data); // Data is where the error is stored
});

// const { jwtVerify } = require('./components/passport/jwt/jwt');
// (async () => console.log(await jwtVerify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ2hlIiwiZW1haWwiOiJjaGVAY2hlLmNvbSIsInJvbGUiOiJhZG1pbmlzdHJhdG9yIiwiaW5zdGl0dXRpb24iOiI1ZDFjZjE2M2E5NWZkMjQ2YjY4NDk5MmMiLCJpYXQiOjE1NjIxNzc5MDMsImV4cCI6MTU5MzczNTUwM30.REL2VL8PIjT92PW1EQLLVgyvkKC2UsLwNxEDP432_Hs')))();

app.listen(process.env.PORT, () => console.log(`Open http://localhost:${process.env.PORT} to see a response.`));
