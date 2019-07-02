const passport = require('passport');
const { JwtStrategy } = require('./jwt/jwt');

module.exports = (app) => {
  app.use(passport.initialize({}));
  passport.use(JwtStrategy);
};
