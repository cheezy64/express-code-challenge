/* eslint-disable global-require */
module.exports = (app) => {
  const router = require('express').Router();
  const {
    addUser,
    loginUser,
  } = require('./user.impl')(app);

  router.post('/create', async (req, res, next) => {
    const response = await addUser(req.body);
    if (response.status === 'success') {
      res.send(response);
    } else {
      next(response);
    }
  });

  router.post('/signin', async (req, res, next) => {
    const response = await loginUser(req.body);
    if (response.status === 'success') {
      res.send(response);
    } else {
      next(response);
    }
  });

  return router;
};
