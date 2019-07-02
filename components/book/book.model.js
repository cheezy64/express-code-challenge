const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const { model, Schema } = mongoose;
const { ObjectId } = Schema;

// TODO index isbn, title, author, and denormalized institution domain
// TODO validate isbn
const BookSchema = new Schema({
  isbn: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
  },
  authors: {
    type: [String],
  },
  // TODO denormalize institution domain so we can get list of books for institution in one query
  institutions: [{
    type: ObjectId,
    ref: 'Institution',
  }],
},
{
  timestamps: true,
});

BookSchema.plugin(uniqueValidator);

module.exports = model('Book', BookSchema);
