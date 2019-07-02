//// Modules
require('env-smart').load(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

// Routes
const indexRoute = require('./routes/index.js');

//// Mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('Connected to database'))
  .catch(err => console.error(err));

const app = express();

//// Middleware
// Logging
app.use(morgan('dev'));

//// Routes
app.get('/', indexRoute);

app.listen(process.env.PORT, () => console.log(`Open http://localhost:${process.env.PORT} to see a response.`));
