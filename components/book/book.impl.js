/* eslint-disable global-require */
module.exports = (app) => {
  const jsend = require('jsend');
  const Book = require('./book.model');

  const getBooks = async (institutionId) => {
    if (!institutionId) return jsend.fail('Institution ID Required');

    try {
      const projection = 'isbn title author';
      const data = await Book.find({ institutions: { $in: institutionId } }, projection);
      return jsend.success(data);
    } catch (err) {
      return jsend.fail(err);
    }
  };

  return {
    getBooks,
  };
};
