const handlers = require("../helpers/handlers");
const usersService = require("../services/users");
const authService = require("../services/auth");
const { validationResult } = require("express-validator");
const { User, UserFull } = require("../models/users");

/**
 * Users retrieval controller
 * @param {} request
 * @param {} response
 */
const getUsers = handlers.asyncHandler(async (request, response) => {
	try {
		await usersService.retrieveAll((error, data) => {
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
					"An error occurred during users retrieval",
					null
				)
			);
	}
});

/**
 * Specified user retrieval controller
 * @param {} request
 * @param {} response
 */
const getUser = handlers.asyncHandler(async (request, response) => {
	try {
		const { id } = request.params;

		await usersService.retrieveOne(id, (error, data) => {
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
					"An error occurred during user retrieval",
					null
				)
			);
	}
});

/**
 * Avatar update controller
 * @param {} request
 * @param {} response
 */
const updateAvatar = handlers.asyncHandler(async (request, response) => {
	const errors = validationResult(request);
	if (errors.isEmpty()) {
		try {
			const user = request.user;
			const { avatar } = request.body;

			await usersService.updateAvatar(
				{ id: user.id, avatar },
				(error, data) => {
					if (error) {
						console.log(error);
						return response.status(error.code).json(error);
					}
					return response.status(data.code).json(data);
				}
			);
		} catch (error) {
			console.log(error);
			return response
				.status(500)
				.json(
					handlers.responseHandler(
						false,
						500,
						"An error occurred during avatar update",
						null
					)
				);
		}
	} else {
		console.log(errors);
		return response
			.status(500)
			.json(handlers.responseHandler(false, 500, "Wrong avatar value", null));
	}
});

/**
 * User deletion controller
 * @param {} request
 * @param {} response
 */
const deleteUser = handlers.asyncHandler(async (request, response) => {
	const tokenUser = request.user;
	const { id } = request.params;
	let toDelete = tokenUser.id;
	if (tokenUser.id !== id && tokenUser.role !== "admin") {
		return response
			.status(403)
			.json(
				handlers.responseHandler(
					false,
					403,
					"You don't have permission to delete users",
					null
				)
			);
	}
	if (tokenUser.id !== id && tokenUser.role === "admin") {
		toDelete = id;
	}
	try {
		await usersService.deleteUser(toDelete, (error, data) => {
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
					"An error occurred during user deletion",
					null
				)
			);
	}
});

/**
 * User update controller
 * @param {} request
 * @param {} response
 */
const updateUser = handlers.asyncHandler(async (request, response) => {
	const tokenUser = request.user;
	const { id } = request.params;
	let toUpdate = tokenUser.id;
	if (tokenUser.id !== id && tokenUser.role !== "admin") {
		return response
			.status(403)
			.json(
				handlers.responseHandler(
					false,
					403,
					"You don't have permission to update users data",
					null
				)
			);
	}
	if (tokenUser.id !== id && tokenUser.role === "admin") {
		toUpdate = id;
	}
	try {
		const params = {
			id: toUpdate,
			data: User(request.body),
		};
		await usersService.updateUser(params, (error, data) => {
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
					"An error occurred during user data update",
					null
				)
			);
	}
});

/**
 * User creation controller
 * @param {} request
 * @param {} response
 */
const createNewUser = handlers.asyncHandler(async (request, response) => {
	const user = request.user;
	if (user.role !== "admin") {
		console.log("User is not admin");
		return response
			.status(403)
			.json(
				handlers.responseHandler(
					false,
					403,
					"You don't have permission to create users",
					null
				)
			);
	}
	const errors = validationResult(request);
	if (errors.isEmpty()) {
		try {
			const newUser = UserFull(request.body);
			await authService.register(newUser, (error, data) => {
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
						"An error occurred during user creation",
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
					"An error occurred during user creation",
					null
				)
			);
	}
});
module.exports = {
	createNewUser,
	getUsers,
	getUser,
	updateAvatar,
	updateUser,
	deleteUser,
};
