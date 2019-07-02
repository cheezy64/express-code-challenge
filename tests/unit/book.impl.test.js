//// Mocks
const mockingoose = require('mockingoose').default;
const Book = require('../../components/book/book.model');
const mongoose = require('mongoose');
const { Schema: { ObjectId } } = mongoose;

//// Test
const { getBooks } = require('../../components/book/book.impl')();

describe('Book', () => {
  const objId1 = new ObjectId('1');
  const objId2 = new ObjectId('2');
  const objId3 = new ObjectId('3');
  const book1 = {
    isbn: 'isbn1',
    title: 'Twilight',
    authors: ['Steve Jobs'],
    institutions: [objId1, objId2],
  };

  const book2 = {
    isbn: 'isbn2',
    title: 'Twilight 2',
    authors: ['Steve Jobs'],
    institutions: [objId1, objId3],
  };

  beforeEach(() => {
    mockingoose(Book).toReturn([book1, book2], 'find');
  });
  afterEach(() => {
    mockingoose.resetAll();
  });

  describe('getBooks(objId1)', () => {
    it('returns status success', () => {
      return getBooks(objId1).then(data => expect(data).toMatchObject({ status: 'success' }));
    });

    it('returns data from query', () => {
      // TODO, ideally show that the two documents that match objId1 are returned.  But, it requires
      // more mocking
    });
  });

  describe('getBooks()', () => {
    it('returns fail', () => {
      return getBooks().then(data => expect(data).toMatchObject({ status: 'fail' }));
    });
  });
});
