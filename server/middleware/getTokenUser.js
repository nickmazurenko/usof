const jwt = require("jsonwebtoken");
const config = require("../config/keys.config");
const UsersModel = require("../models/users");
/**
 *
 * @param {Object} token user token
 * @return user by id from token
 */
const getTokenUser = async (token) => {
	let decoded = jwt.decode(token, config.JWT.SECRET);
	if (decoded) {
		let user = await UsersModel.retrieveOne({ id: decoded.user.id });
		if (!user) return null;
		if (
			new Date(decoded.user.issuedAt).getTime() <
			new Date(user.tokenInvalidationDate).getTime()
		) {
			return null;
		}
		return user;
	}
	return null;
};

module.exports = getTokenUser;
