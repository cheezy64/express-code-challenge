// Load environment variables
require('env-smart').load();

const express = require('express');
const morgan = require('morgan');

const app = express();

// Routes
const indexRoute = require('./routes/index.js');

//// Middleware
// Logging
app.use(morgan('dev'));

app.get('/', indexRoute);

app.listen(process.env.PORT, () => console.log(`Open http://localhost:${process.env.PORT} to see a response.`));
