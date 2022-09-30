const { PostsTemplate, LikesTemplate, UsersTemplate } = require("../templates");
const handlers = require("../helpers/handlers");
const sequelize = require("sequelize");
const { dbResponse } = require("../helpers/db");
const { response } = require("express");

const getPostLikes = async (id, callback) => {
	const likes = await LikesTemplate.findAll({
		where: {
			post_id: id,
		},
		attributes: [
			"user_id",
			"post_id",
			"type",
			"createdAt",
			[sequelize.literal("user.login"), "login"],
		],
		include: {
			model: UsersTemplate,
			attributes: [],
		},
	}).catch((error) => {
		console.log(error);
		return callback(
			handlers.responseHandler(
				false,
				500,
				"An error occurred during likes retrieval",
				null
			),
			null
		);
	});

	if (likes.length === 0) {
		return callback(
			handlers.responseHandler(
				false,
				404,
				"No likes for post with this id",
				null
			),
			null
		);
	}

	return likes;
};

const create = async (like, callback) => {
	try {
		const { type, ...params } = like;
		const dbLike = await LikesTemplate.findOne({
			where: params,
		});

		if (dbLike) {
			await LikesTemplate.update(
				{ type },
				{
					where: params,
				}
			);
			return callback(
				null,
				handlers.responseHandler(true, 200, "Like type update successful", null)
			);
		}
		await LikesTemplate.create(like);
		return callback(
			null,
			handlers.responseHandler(true, 200, "Like creation successful", null)
		);
	} catch (error) {
		console.log(error);
		return callback(
			handlers.responseHandler(
				false,
				500,
				"An error occurred during like creation",
				null
			),
			null
		);
	}
};

module.exports = {
	getPostLikes,
	create,
};
