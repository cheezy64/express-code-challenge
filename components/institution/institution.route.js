/* eslint-disable global-require */
module.exports = (app) => {
  const router = require('express').Router();
  const { addInstitution } = require('./institution.impl')(app);

  router.post('/create', async (req, res, next) => {
    const response = await addInstitution(req.body);
    if (response.status === 'success') {
      res.send(response);
    } else {
      next(response);
    }
  });

  return router;
};
