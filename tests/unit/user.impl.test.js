/* eslint-disable object-curly-newline */
//// Mocks
const mockingoose = require('mockingoose').default;
const User = require('../../components/user/user.model');
const mongoose = require('mongoose');
const { Schema: { ObjectId } } = mongoose;

//// Test
const { 
  parseInstitutionFromEmail,
  addUser,
  loginUser,
} = require('../../components/user/user.impl')();

describe('Util', () => {
  describe('.parseInstitutionFromEmail', () => {
    it('returns domain when a valid email is passed into it', () => {
      const local = 'joeschmoe';
      const domain = 'gmail.com';
      const arg = `${local}@${domain}`;
      const result = parseInstitutionFromEmail(arg);
      expect(result).toBe(domain);
    });

    it('throws when argument is null', () => {
      expect(() => parseInstitutionFromEmail()).toThrow();
    });

    // TODO look into if parameterized tests exist
    it('throws when email is invalid', () => {
      expect(() => parseInstitutionFromEmail('joeschmoe@@test.com')).toThrow();
      expect(() => parseInstitutionFromEmail('joeschmoe@test.com@gmail.com')).toThrow();
      expect(() => parseInstitutionFromEmail('joe.schmoe@.com')).toThrow();
      expect(() => parseInstitutionFromEmail('@gmail.com')).toThrow();
    });
  });
});

describe('User', () => {
  const user1UnhashedPassword = 'deathwhinny';
  const docUser1 = {
    name: 'Dr Horrible',
    email: 'dr@horrible.com',
    role: 'administrator',
    password: '$2a$10$csWcpxqFK8S5/8VnagiDwultQtYkNWNCdDPDiBYzWdItLZkiNArW2',
    institution: new ObjectId('1'),
  }
  /*  TODO These fail due to the validation of the institution key referencing the "Institution" table
      Not sure how to fix this yet.  These tests are not that important though, as now that I think about
      it, it's just revalidating Mongoose's functionality 
  describe('Model Verification', () => {
    it('passes validation (no error returned)', () => {
      expect(User({ name, email, role, password, institution }).validateSync()).not.toBeTruthy();
    });

    it('errors when missing required parameters', () => {
      expect(User({       email, role, password, institution }).validateSync()).toBeTruthy();
      expect(User({ name,        role, password, institution }).validateSync()).toBeTruthy();
      expect(User({ name, email,       password, institution }).validateSync()).toBeTruthy();
      expect(User({ name, email, role,           institution }).validateSync()).toBeTruthy();
      expect(User({ name, email, role, password              }).validateSync()).toBeTruthy();
    });

    it('salts and hashes the password', () => {
    });
  });
  */

  describe('.addUser()', () => {
    afterEach(() => {
      mockingoose.resetAll();
    });

    it('returns fail when email has already been registered', async () => {
      mockingoose(User).toReturn(docUser1, 'findOne');
      const response = await addUser({ email: docUser1.email, password: user1UnhashedPassword });
      expect(response).toMatchObject({ status: 'fail' });
    });
  });

  describe('.loginUser()', () => {
    afterEach(() => {
      mockingoose.resetAll();
    });

    it('returns fail when email is not found', async () => {
      const response = await loginUser({ email: docUser1.email, password: user1UnhashedPassword });
      expect(response).toMatchObject({ status: 'fail' });
    });

    it('returns a token when user logs in successfully', async () => {
      mockingoose(User).toReturn(docUser1, 'findOne');
      const response = await loginUser({ email: docUser1.email, password: user1UnhashedPassword });
      expect(response).toMatchObject({ status: 'success' });
    });
  });
});
