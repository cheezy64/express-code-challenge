require('env-smart').load(); // Load environment variables

/* eslint-disable object-curly-newline */
const jwt = require('jsonwebtoken');
const { Strategy, ExtractJwt } = require('passport-jwt');
const { promisify } = require('util');

const jwtOpts = {
  algorithm: 'HS256',
  expiresIn: '1y',
};
const jwtSignPromise = promisify(jwt.sign);
const jwtVerifyPromise = promisify(jwt.verify);

const jwtStrategyOpts = {
  algorithms: [`${jwtOpts.algorithm}`],
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY,
};
if (!jwtStrategyOpts.secretOrKey) {
  throw new Error('Please specify a secret key to use for JWT passport');
}

const JwtStrategy = new Strategy(jwtStrategyOpts, (jwtPayload, done) => {
  const { name, email, role, institution } = jwtPayload;
  return done(null, { name, email, role, institution });
});

module.exports = {
  JwtStrategy,
  ExtractJwt,
  jwtSign: async payload => jwtSignPromise(payload, process.env.JWT_SECRET_KEY, jwtOpts),
  jwtVerify: async token => jwtVerifyPromise(token, process.env.JWT_SECRET_KEY),
};
