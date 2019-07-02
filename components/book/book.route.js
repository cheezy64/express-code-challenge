/* eslint-disable global-require */
module.exports = (app) => {
  const router = require('express').Router();
  const { getBooks, addBook } = require('./book.impl')(app);

  router.get('/', async (req, res, next) => {
    console.log(req.user); // Passport middleware populates this as long as we call the 'jwt' strategy.
    // TODO give app access to passport and insert middleware at this level
    const response = await getBooks(req.user.institution);
    if (response.status === 'success') {
      res.send(response);
    } else {
      next(response);
    }
  });

  router.post('/create', async (req, res, next) => {
    const response = await addBook(req.body);
    if (response.status === 'success') {
      res.send(response);
    } else {
      next(response);
    }
  });

  return router;
};
