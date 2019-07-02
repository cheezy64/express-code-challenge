/* eslint-disable global-require */
module.exports = (app) => {
  const jsend = require('jsend');
  const Institution = require('./institution.model');

  const addInstitution = async (institution) => {
    const { name, url, domain } = institution;

    try {
      const newInstitution = new Institution({
        name,
        url,
        domain,
      });
      // Lean on the model for validation
      await newInstitution.validate();
      const data = await newInstitution.save();
      return jsend.success(data);
    } catch (err) {
      return jsend.fail(err);
    }
  };

  return {
    addInstitution,
  };
};
