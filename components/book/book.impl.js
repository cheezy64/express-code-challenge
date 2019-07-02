const jsend = require('jsend');
const Book = require('./book.model');

const getBooks = async (institutionId) => {
  if (!institutionId) return jsend.fail('Institution ID Required');

  const projection = 'isbn title author';
  const data = await Book.find({ institutions: { $in: institutionId } }, projection);
  return jsend.success(data);
};

module.exports = (app) => {
  return {
    getBooks,
  };
};
