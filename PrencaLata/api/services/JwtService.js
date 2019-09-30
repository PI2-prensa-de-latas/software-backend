
const jwt = require('jsonwebtoken');

module.exports = {
  sign: function (payload, expiresIn) {
    return jwt.sign(payload, sails.config.session.secret, {...expiresIn})
  },

  verify: function (token, callback) {
    jwt.verify(token, sails.config.session.secret, callback);
  }
}