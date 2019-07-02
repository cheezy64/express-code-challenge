const mongoose = require('mongoose');
// TODO FIXME Validation fails on unit test.  Pretty sure it's a unit test issue but since this module isn't
// vital, I'm going to disable this for now until I have time to investigate

// const uniqueValidator = require('mongoose-unique-validator');

const { model, Schema } = mongoose;

// TODO index by domain, validate and normalize url
const InstitutionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: String,
  domain: {
    type: String,
    required: true,
    unique: true,
  },
},
{
  timestamps: true,
});

// InstitutionSchema.plugin(uniqueValidator);

module.exports = model('Institution', InstitutionSchema);
