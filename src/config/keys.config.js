const dotenv = require("dotenv");

dotenv.config();

/**
 *
 * @param {String} key
 * @returns the value under key from process environment
 */
const getEnvironmentVar = (key) => {
	const value = process.env[key];
	if (!value) {
		throw new Error(`No variables with key ${key}`);
	}
	return value;
};

/**
 * Config for database and jsonwebtoken to work
 * using environment variables
 */
const config = {
	DB: {
		DATABASE: getEnvironmentVar("DATABASE"),
		USER: getEnvironmentVar("USER"),
		PASSWORD: getEnvironmentVar("PASSWORD"),
		HOST: getEnvironmentVar("HOST"),
	},
	JWT: {
		SECRET: getEnvironmentVar("JWT_SECRET"),
		EMAIL_SECRET: getEnvironmentVar("JWT_EMAIL_SECRET"),
		EXPIRES_IN: +getEnvironmentVar("JWT_EXPIRES_IN"),
		PASSWORD_SECRET: getEnvironmentVar("JWT_PASSWORD_RESET_SECRET"),
	},
	EMAIL: {
		USER: getEnvironmentVar("EMAIL_USER"),
		PASSWORD: getEnvironmentVar("EMAIL_PASSWORD"),
		LINK: getEnvironmentVar("VERIFICATION_LINK"),
	},
};

module.exports = config;
