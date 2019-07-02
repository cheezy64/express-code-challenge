//// Mocks
const mockingoose = require('mockingoose').default;
const Institution = require('../../components/institution/institution.model');

//// Test
const { addInstitution } = require('../../components/institution/institution.impl')();

describe('Institution', () => {
  beforeEach(() => {
    mockingoose(Institution);
  });
  afterEach(() => {
    mockingoose.resetAll();
  });

  describe('.addInstitution() called with valid model', () => {
    const validInstitute = {
      name: 'Hogwarts',
      url: '',
      domain: 'hogwarts.com',
    };
    it('returns status success', () => {
      return addInstitution(validInstitute).then(data => expect(data).toMatchObject({ status: 'success' }));
    });
  });

  describe('.addInstitution() fails validation', () => {
    const invalidInstitute = {
      name: 'Hogwarts',
      url: '',
    };
    it('returns status fail', () => {
      return addInstitution(invalidInstitute).then(data => expect(data).toMatchObject({ status: 'fail' }));
    });
  });
});
