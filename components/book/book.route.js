/* eslint-disable global-require */
module.exports = (app) => {
  const router = require('express').Router();
  const { getBooks } = require('./book.impl')(app);

  router.get('/', async (req, res, next) => {
    const response = await getBooks(req.body);
    if (response.status === 'success') {
      res.send(response);
    } else {
      next(response);
    }
  });

  return router;
};
