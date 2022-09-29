const {
	UsersTemplate,
	PostsTemplate,
	CategoriesTemplate,
	AnswersTemplate,
	CommentsTemplate,
} = require("../templates");
const sequelize = require("sequelize");
const { responseHandler } = require("../helpers/handlers");
const { dbResponse } = require("../helpers/db");

/**
 * user template for registration
 * @param {Object} user
 * @returns user model object fitting template
 */
const User = (user) => ({
	login: user.login,
	password: user.password,
	fullName: user.fullName,
	email: user.email,
});

/**
 * Full user template for creation route
 * @param {Object} rawData raw data to fill into template
 * @returns
 */
const UserFull = (rawData) => ({
	...(rawData.login ? { login: rawData.login } : {}),
	...(rawData.password ? { password: rawData.password } : {}),
	...(rawData.fullName ? { fullName: rawData.fullName } : {}),
	...(rawData.email ? { email: rawData.email } : {}),
	...(rawData.rating ? { rating: rawData.rating } : {}),
	...(rawData.views ? { views: rawData.views } : {}),
	...(rawData.role ? { role: rawData.role } : {}),
	...(rawData.tokenInvalidationDate
		? { tokenInvalidationDate: rawData.tokenInvalidationDate }
		: {}),
	...(rawData.isEmailVerified
		? { isEmailVerified: rawData.isEmailVerified }
		: {}),
	...(rawData.profilePicture ? { profilePicture: rawData.profilePicture } : {}),
});

/**
 * Fetching user data found by given parameters
 * @param {Object} params
 * @returns user fitting given conditions in params
 */
const retrieveOne = async (params) =>
	await UsersTemplate.findOne({
		where: params,
	}).catch((error) => {
		console.log(error);
		throw new Error("No such user");
	});

/**
 * Fetching user data with additional info about posts, answers and comments
 * @param {Number} id
 * @returns user with data
 */
const retrieveOneWithInfo = async (id) => {
	let result = await UsersTemplate.findOne({
		where: { id },
		attributes: [
			"id",
			"login",
			"profile_picture",
			"full_name",
			"email",
			"views",
			"rating",
			"created_at",
			[sequelize.literal("COUNT(DISTINCT(answers.id))"), "answers_count"],
			[sequelize.literal("COUNT(DISTINCT(posts.id))"), "posts_count"],
			[sequelize.literal("COUNT(DISTINCT(comments.id))"), "comments_count"],
			[
				sequelize.literal("COUNT(DISTINCT(category_title))"),
				"categories_count",
			],
		],
		include: [
			{
				required: false,
				model: PostsTemplate,
				attributes: [],
				include: {
					attributes: [],
					required: false,
					model: CategoriesTemplate,
				},
			},
			{
				attributes: [],
				required: false,
				model: CommentsTemplate,
			},
			{
				required: false,
				attributes: [],
				model: AnswersTemplate,
			},
		],
		group: ["users.id"],
	}).catch((error) => {
		console.log(error);
		throw new Error("An error occurred during user retrieval");
	});

	if (!result || result.length === 0) {
		throw new Error(`No user with this id: ${id}`);
	}
	console.log(result);
	result = dbResponse(
		result,
		"id",
		"login",
		"rating",
		"email",
		"views",
		"full_name",
		"profile_picture",
		"created_at",
		"answers_count",
		"posts_count",
		"categories_count",
		"comments_count"
	);
	return result;
};

/**
 * Fetching all users from database
 * @param {Function} callback
 * @returns all currently known users
 */
const retrieveAll = async (callback) => {
	const result = await UsersTemplate.findAll({
		attributes: [
			"id",
			"login",
			"profilePicture",
			"rating",
			"views",
			"created_at",
			"fullName",
			"email",
			[sequelize.literal("COUNT(DISTINCT(posts.id))"), "posts_count"],
			[
				sequelize.literal("COUNT(DISTINCT(category_title))"),
				"categories_count",
			],
		],
		include: [
			{
				required: false,
				model: PostsTemplate,
				attributes: [],
				include: {
					attributes: [],
					required: false,
					model: CategoriesTemplate,
				},
			},
		],
		group: ["users.id"],
		order: [[sequelize.col("posts_count"), "DESC"]],
	}).catch((error) => {
		console.log(error);
		return callback(responseHandler(false, 500, "Server error!", null), null);
	});

	const users = result.map((user) =>
		dbResponse(
			user,
			"id",
			"login",
			"profilePicture",
			"email",
			"fullName",
			"rating",
			"views",
			"created_at",
			"posts_count",
			"categories_count"
		)
	);
	if (users?.length === 0) {
		return callback(responseHandler(false, 404, "No users found", null), null);
	}

	return callback(
		responseHandler(true, 200, "Successfully retrieved all users", users)
	);
};

/**
 * Adding given user to database
 * @param {Object} user
 */
const create = async (user) =>
	await UsersTemplate.create(user).catch((error) => {
		console.log(error);
		throw new Error("Error occurred during registration!");
	});

/**
 * Updating email verification status in database
 * @param {String} email
 * @param {String} login
 */
const verifyEmail = async (email, login) => {
	await UsersTemplate.update(
		{
			isEmailVerified: true,
		},
		{
			where: { email, login },
		}
	).catch((error) => {
		console.log(error);
		throw new Error("No user with given login");
	});
};

/**
 * updating given user avatar
 * @param {String} id
 * @param {String} avatar
 */
const updateAvatar = async (id, avatar) => {
	await UsersTemplate.update(
		{
			profilePicture: avatar,
		},
		{
			where: { id },
		}
	).catch((error) => {
		console.log(error);
		throw new Error(error);
	});
};

/**
 * Updating given user password
 * @param {String} login
 * @param {String} newPassword
 */
const updatePassword = async (login, newPassword) => {
	await UsersTemplate.update(
		{
			password: newPassword,
		},
		{
			where: { login },
		}
	).catch((error) => {
		console.log(error);
		throw new Error("No user with given login");
	});
};

/**
 * Adding views to given user
 * @param {String} id
 */
const addViewsId = async (id) => {
	await UsersTemplate.increment("views", {
		by: 1,
		where: { id },
	}).catch((error) => {
		console.log(error);
		throw new Error("No user with given id");
	});
};

/**
 * Invalidating token of a given user
 * @param {String} id
 */
const updateTokenInvalidation = async (id) => {
	await UsersTemplate.update(
		{
			tokenInvalidationDate: new Date().toISOString(),
		},
		{
			where: { id },
		}
	).catch((error) => {
		console.log(error);
		throw new Error("No user with given id");
	});
};

/**
 * Deleting user fitting given parameters
 * @param {Object} params
 */
const deleteUser = async (params) => {
	await UsersTemplate.destroy({
		where: params,
	}).catch((error) => {
		console.log(error);
		throw new Error("No user with such params");
	});
};

/**
 * Updating given user info
 * @param {String} id user
 * @param {Object} newData new user data
 */
const updateUser = async (id, newData) => {
	await UsersTemplate.update(newData, {
		where: { id },
	}).catch((error) => {
		console.log(error);
		throw new Error(error);
	});
};

module.exports = {
	User,
	UserFull,
	create,
	verifyEmail,
	addViewsId,
	deleteUser,
	updatePassword,
	updateAvatar,
	updateUser,
	updateTokenInvalidation,
	retrieveAll,
	retrieveOne,
	retrieveOneWithInfo,
};
