const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

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

InstitutionSchema.plugin(uniqueValidator);

module.exports = model('Institution', InstitutionSchema);
