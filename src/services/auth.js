const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../middleware/sendEmail");
const handlers = require("../helpers/handlers");
const UsersModel = require("../models/users");
const config = require("../config/keys.config");

const register = async (user, callback) => {
	const salt = bcrypt.genSaltSync(10);
	user.password = bcrypt.hashSync(user.password, salt);
	const userObj = await UsersModel.create(user);

	const tokenData = {
		user: {
			id: userObj.dataValues.id,
			issuedAt: new Date().toISOString(),
		},
	};
	if (!userObj.dataValues.isEmailVerified) {
		const token = jwt.sign(
			{
				data: { email: user.email, login: user.login },
			},
			config.JWT.EMAIL_SECRET,
			{ expiresIn: "10m" }
		);
		const subject = "email verification";
		const link = "/api/auth/confirm-email/";

		await sendEmail(user.email, subject, { link, token });
	}
	jwt.sign(
		tokenData,
		config.JWT.SECRET,
		{
			expiresIn: new Date().setDate(
				config.JWT.EXPIRES_IN + new Date().getDate()
			),
		},
		(error, decoded) => {
			if (error) {
				console.log(error);
				return callback(
					handlers.responseHandler(
						false,
						error.statusCode,
						error.message,
						null
					),
					null
				);
			}
			return callback(
				null,
				handlers.responseHandler(true, 200, "User registered", {
					token: decoded,
				})
			);
		}
	);

	return tokenData;
};

const resetPassword = async ({ token, password }, callback) => {
	const salt = bcrypt.genSaltSync(10);
	const newPassword = bcrypt.hashSync(password, salt);
	jwt.verify(token, config.JWT.PASSWORD_SECRET, (error, decoded) => {
		if (error) {
			console.log(error);
			return callback(
				handlers.responseHandler(false, 400, "Password reset failed!", null),
				null
			);
		} else {
			UsersModel.updatePassword(decoded.data.login, newPassword);
			return callback(
				handlers.responseHandler(true, 200, "Password reset successful!", null),
				null
			);
		}
	});
};

const sendPasswordReset = async (email, callback) => {
	const dbUser = await UsersModel.retrieveOne({ email });
	if (dbUser === null) {
		callback(
			handlers.responseHandler(false, 404, "No user with such email", null),
			null
		);
		return null;
	}
	const data = { email: dbUser.email, login: dbUser.login };
	jwt.sign(
		{ data },
		config.JWT.PASSWORD_SECRET,
		{ expiresIn: "5m" },
		(error, token) => {
			if (error) {
				console.log(error);
				return callback(
					handlers.responseHandler(
						false,
						error.statusCode,
						error.message,
						null
					),
					null
				);
			}
			const link = "/api/auth/password-reset/";
			const subject = "password reset";
			sendEmail(dbUser.email, subject, {
				link,
				token,
			});

			return callback(
				null,
				handlers.responseHandler(
					true,
					200,
					"Email with password-reset link sent",
					{
						token,
					}
				)
			);
		}
	);
	return data;
};

const sendEmailVerification = async ({ email }, callback) => {
	const dbUser = await UsersModel.retrieveOne({ email });
	if (dbUser === null) {
		callback(
			handlers.responseHandler(false, 404, "No user with such login", null),
			null
		);
		return null;
	}
	if (dbUser.isEmailVerified) {
		console.log("Email already verified");
		return callback(
			handlers.responseHandler(false, 400, "Email already confirmed", null),
			null
		);
	}
	const data = { email: dbUser.email, login: dbUser.login};
	jwt.sign(
		{ data },
		config.JWT.EMAIL_SECRET,
		{ expiresIn: "10m" },
		(error, token) => {
			if (error) {
				console.log(error);
				return callback(
					handlers.responseHandler(
						false,
						error.statusCode,
						error.message,
						null
					),
					null
				);
			}
			const link = "/api/auth/confirm-email/";
			const subject = "email verification";
			sendEmail(dbUser.email, subject, {
				link,
				token,
			});

			return callback(
				null,
				handlers.responseHandler(true, 200, "Email sent", null)
			);
		}
	);
	return data;
};
const verifyEmail = async (token, callback) => {
	jwt.verify(token, config.JWT.EMAIL_SECRET, (error, decoded) => {
		if (error) {
			console.log(error);
			return callback(
				handlers.responseHandler(
					false,
					400,
					"Email verification failed!",
					null
				),
				null
			);
		} else {
			UsersModel.verifyEmail(decoded.data.email, decoded.data.login);
			return callback(
				handlers.responseHandler(
					true,
					200,
					"Email verification successful!",
					null
				),
				null
			);
		}
	});
};

const logout = async (dbUser, callback) => {
	if (dbUser) {
		await UsersModel.updateTokenInvalidation(dbUser.id);
		return callback(
			handlers.responseHandler(true, 200, "Logout successful!", null),
			null
		);
	}

	return callback(
		handlers.responseHandler(
			false,
			400,
			"Logout failed. User is not logged in",
			null
		),
		null
	);
};

const login = async (user, callback) => {
	const dbUser = await UsersModel.retrieveOne({ login: user.login });

	if (!dbUser) {
		callback(
			handlers.responseHandler(false, 404, "No user with such login", null),
			null
		);
		return null;
	}

	if (dbUser.isEmailVerified === false) {
		callback(
			handlers.responseHandler(false, 400, "Your email is not confirmed", null),
			null
		);
	}

	const isCorrect = bcrypt.compareSync(user.password, dbUser.password);
	if (isCorrect) {
		const tokenData = {
			user: {
				id: dbUser.id,
				issuedAt: new Date().toISOString(),
			},
		};

		jwt.sign(
			tokenData,
			config.JWT.SECRET,
			{
				expiresIn: new Date().setDate(
					config.JWT.EXPIRES_IN + new Date().getDate()
				),
			},
			(error, decoded) => {
				if (error) {
					console.log(error);
					return callback(
						handlers.responseHandler(
							false,
							error.statusCode,
							error.message,
							null
						),
						null
					);
				}
				return callback(
					null,
					handlers.responseHandler(true, 200, "Login successful", {
						token: decoded,
					})
				);
			}
		);

		return tokenData;
	}
	callback(handlers.responseHandler(false, 400, "Wrong password", null), null);
	return null;
};

module.exports = {
	register,
	sendEmailVerification,
	sendPasswordReset,
	verifyEmail,
	login,
	logout,
	resetPassword,
};
