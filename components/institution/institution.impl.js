const jsend = require('jsend');
const Institution = require('./institution.model');

const addInstitution = async (institution) => {
  const { name, url, domain } = institution;

  // Lean on the model for validation
  const newInstitution = new Institution({
    name,
    url,
    domain,
  });

  try {
    await newInstitution.validate();
  } catch (err) {
    return jsend.fail(err);
  }

  const data = await newInstitution.save();
  return jsend.success(data);
};

module.exports = (app) => {
  return {
    addInstitution,
  };
};
