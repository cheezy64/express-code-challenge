/* eslint-disable global-require */
module.exports = (app) => {
  const jsend = require('jsend');
  const Book = require('./book.model');

  const getBooks = async (institutionId) => {
    if (!institutionId) return jsend.fail('Institution ID Required');

    try {
      const projection = 'isbn title authors -_id';
      const data = await Book.find({ institutions: { $in: institutionId } }, projection);
      return jsend.success(data);
    } catch (err) {
      return jsend.fail(err);
    }
  };

  // TODO FIXME having trouble getting this validating correctly through the model when sending via Postman
  const addBook = async (book) => {
    const { isbn, title, authors, institutions } = book;

    try {
      const newBook = new Book({
        isbn,
        title,
        authors,
        institutions,
      });
      // Lean on the model for validation
      await newBook.validate();
      await newBook.save();
      return jsend.success({ isbn, title, authors });
    } catch (err) {
      return jsend.fail(err);
    }
  };

  return {
    getBooks,
    addBook,
  };
};
