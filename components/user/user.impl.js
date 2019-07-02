const jsend = require('jsend');
const validator = require('validator');
const User = require('./user.model');

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
      institution = parseInstitutionFromEmail(email),
    } = user;

    const existingUser = await User.find({ email });
    if (existingUser) throw new Error('Email has already been registered');

    const newUser = new User({
      name,
      email,
      role,
      password,
      institution,
    });

    // Lean on the model for validation
    await newUser.validate();

    const data = await newUser.save();
    return jsend.success(data);
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

    const foundUser = await User.find({ email });
    if (!foundUser) throw new Error('Email and/or password does not match records');
    await foundUser.comparePassword(password);

    const data = {
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const tokenOpts = {};
    const token = await generateJsonWebToken(data, tokenOpts);

    return jsend.success(token);
  } catch (err) {
    return jsend.fail(err);
  }
};

module.exports = (app) => {
  return {
    parseInstitutionFromEmail,
    addUser,
    loginUser,
  };
};
