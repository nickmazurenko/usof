const handlers = require("../helpers/handlers");
const { User } = require("../models/users");
const authService = require("../services/auth");
const usersService = require("../services/users");
const { validationResult } = require("express-validator");

/**
 * Registration controller
 */
const register = handlers.asyncHandler(async (request, response) => {
	const errors = validationResult(request);
	if (errors.isEmpty()) {
		try {
			await authService.register(User(request.body), (error, data) => {
				if (error) {
					console.log(error);
					return response.status(error.code).json(error);
				}
				return response.status(data.code).json(data);
			});
		} catch (error) {
			console.log(error);
			return response
				.status(500)
				.json(
					handlers.responseHandler(
						false,
						500,
						"An error occurred during registration",
						null
					)
				);
		}
	} else {
		return response
			.status(500)
			.json(
				handlers.responseHandler(
					false,
					500,
					"An error occurred during registration",
					null
				)
			);
	}
});

/**
 * Email verification controller
 */
const sendEmailVerification = handlers.asyncHandler(
	async (request, response) => {
		const errors = validationResult(request);
		if (errors.isEmpty()) {
			try {
				await authService.sendEmailVerification(request.body, (error, data) => {
					if (error) {
						console.log(error);
						return response.status(error.code).json(error);
					}
					return response.status(data.code).json(data);
				});
			} catch (error) {
				console.log(error);
				return response
					.status(500)
					.json(
						handlers.responseHandler(
							false,
							500,
							"An error occurred while trying to send an email verification",
							null
						)
					);
			}
		} else {
			console.log(errors);
			return response
				.status(500)
				.json(
					handlers.responseHandler(
						false,
						500,
						"An error occurred while trying to send an email verification",
						null
					)
				);
		}
	}
);

/**
 * Login controller
 */
const login = handlers.asyncHandler(async (request, response) => {
	const errors = validationResult(request);

	if (errors.isEmpty()) {
		try {
			await authService.login(User(request.body), (error, data) => {
				if (error) {
					console.log(error);
					return response.status(error.code).json(error);
				}
				return response.status(data.code).json(data);
			});
		} catch (error) {
			console.log(error);
			return response
				.status(500)
				.json(
					handlers.responseHandler(
						false,
						500,
						"An error occurred during login",
						null
					)
				);
		}
	} else {
		return response
			.status(500)
			.json(
				handlers.responseHandler(
					false,
					500,
					"An error occurred during login",
					null
				)
			);
	}
});

/**
 * logout controller
 */
const logout = handlers.asyncHandler(async (request, response) => {
	try {
		const user = request.user;
		await authService.logout(user, (error, data) => {
			if (error) {
				console.log(error);
				return response.status(error.code).json(error);
			}
			return response.status(data.code).json(data);
		});
	} catch (error) {
		console.log(error);
		response
			.status(500)
			.json(
				handlers.responseHandler(
					false,
					500,
					"An error occurred during logout",
					null
				)
			);
	}
});

/**
 * Logged user data request controller
 */
const getUser = handlers.asyncHandler(async (request, response) => {
	try {
		await usersService.loadUser(request.user.id, (error, data) => {
			if (error) {
				console.log(error);
				return response.status(error.code).json(error);
			}
			return response.status(data.code).json(data);
		});
	} catch (error) {
		console.log(error);
		return response
			.status(500)
			.json(
				handlers.responseHandler(
					false,
					500,
					"An error occurred while trying to get logged user",
					null
				)
			);
	}
});

/**
 * Password reset controller
 */
const resetPassword = handlers.asyncHandler(async (request, response) => {
	const errors = validationResult(request);
	if (errors.isEmpty()) {
		try {
			const data = {
				password: request.body.password,
				token: request.params.token,
			};
			await authService.resetPassword(data, (error, data) => {
				if (error) {
					console.log(error);
					return response.status(error.code).json(error);
				}
				return response.status(data.code).json(data);
			});
		} catch (error) {
			console.log(errors);
			return response
				.status(500)
				.json(
					handlers.responseHandler(
						false,
						500,
						"An error occurred during password reset",
						null
					)
				);
		}
	} else {
		console.log(errors);
		return response
			.status(500)
			.json(
				handlers.responseHandler(
					false,
					500,
					"An error occurred during password reset",
					null
				)
			);
	}
});

/**
 * Password reset request controller
 */
const requestPasswordReset = handlers.asyncHandler(
	async (request, response) => {
		const errors = validationResult(request);

		if (errors.isEmpty()) {
			try {
				const { email } = request.body;
				await authService.sendPasswordReset(email, (error, data) => {
					if (error) {
						console.log(error);
						return response.status(error.code).json(error);
					}
					return response.status(data.code).json(data);
				});
			} catch (error) {
				console.log(error);
				return response
					.status(500)
					.json(
						handlers.responseHandler(
							false,
							500,
							"An error occurred during password reset attempt",
							null
						)
					);
			}
		} else {
			console.log(errors);
			return response
				.status(500)
				.json(
					handlers.responseHandler(
						false,
						500,
						"An error occurred during password reset attempt",
						null
					)
				);
		}
	}
);

/**
 * Email verification controller
 */
const verifyEmail = handlers.asyncHandler(async (request, response) => {
	try {
		const { token } = request.params;
		await authService.verifyEmail(token, (error, data) => {
			if (error) {
				return response.status(error.code).json(error);
			}
			return response.status(data.code).json(data);
		});
	} catch (error) {
		console.log(error);
		return response
			.status(500)
			.json(
				handlers.responseHandler(
					false,
					500,
					"An error occurred during email verification",
					null
				)
			);
	}
});

module.exports = {
	login,
	logout,
	getUser,
	register,
	verifyEmail,
	resetPassword,
	sendEmailVerification,
	requestPasswordReset,
};
