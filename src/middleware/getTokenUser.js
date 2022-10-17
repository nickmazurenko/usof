const jwt = require('jsonwebtoken');
const config = require('../config/keys.config');
const UsersModel = require('../models/users');
/**
 * @desc gets token user from database
 * @param {Object} token user token
 * @return user by id from token
 */
const getTokenUser = async (token) => {
  const decoded = jwt.decode(token, config.JWT.SECRET);
  if (decoded) {
    const user = await UsersModel.retrieveOne({ id: decoded.user.id });
    if (!user) return null;
    if (
      new Date(decoded.user.issuedAt).getTime()
			< new Date(user.tokenInvalidationDate).getTime()
    ) {
      return null;
    }
    return user;
  }
  return null;
};

module.exports = getTokenUser;
