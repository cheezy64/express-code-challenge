module.exports = (app) => {
  // eslint-disable-next-line global-require
  const jsend = require('jsend');
  const validator = require('validator');
  const User = require('./user.model');
  const Institution = require('../institution/institution.model');
  const { jwtSign } = require('../passport/jwt/jwt');

  const parseInstitutionFromEmail = (email) => {
    if (!validator.isEmail(email)) throw new Error('Invalid email!');
    return email.split('@')[1];
  };

  const addUser = async (user) => {
    try {
      const {
        name,
        email,
        role,
        password,
        domain = parseInstitutionFromEmail(email),
      } = user;

      const existingUserDoc = await User.findOne({ email });
      if (existingUserDoc) throw new Error('Email has already been registered');

      // Get Institution ID for the reference
      const institutionDoc = await Institution.findOne({ domain });
      if (!institutionDoc) throw new Error(`No institution registered for domain ${domain}`);

      const newUser = new User({
        name,
        email,
        role,
        password,
        // eslint-disable-next-line no-underscore-dangle
        institution: institutionDoc._id,
      });

      // Lean on the model for validation
      await newUser.validate();

      await newUser.save();
      return jsend.success({ name, email });
    } catch (err) {
      return jsend.fail(err);
    }
  };


  const loginUser = async (user) => {
    try {
      const {
        email,
        password,
      } = user;

      const foundUser = await User.findOne({ email });
      if (!foundUser) throw new Error('Email and/or password does not match records');
      await foundUser.comparePassword(password);

      const data = {
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        institution: foundUser.institution,
      };

      const token = await jwtSign(data);
      return jsend.success(token);
    } catch (err) {
      return jsend.fail(err);
    }
  };

  return {
    parseInstitutionFromEmail,
    addUser,
    loginUser,
  };
};
