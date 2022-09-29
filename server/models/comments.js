const { CommentsTemplate, UsersTemplate } = require("../templates");
const handlers = require("../helpers/handlers");
const sequelize = require("sequelize");
const { dbResponse } = require("../helpers/db");

const retrieveAll = async (id, callback) => {
	const commentsRaw = await CommentsTemplate.findAll({
		where: {
			postId: id,
		},
		attributes: [
			"id",
			"userId",
			"postId",
			"content",
			"createdAt",
			[sequelize.literal("user.login"), login],
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
				"An error occurred during comments retrieval",
				null
			),
			null
		);
	});

	const comments = commentsRaw.map((comment) =>
		dbResponse(
			answer,
			"id",
			"userId",
			"postId",
			"content",
			"createdAt",
			"login"
		)
	);
	if (comments.length === 0) {
		console.log("No comments were found");
		return callback(
			handlers.responseHandler(false, 404, "No comments were found", null),
			null
		);
	}

	return callback(
		null,
		handlers.responseHandler(
			true,
			200,
			"Comments retrieval successful",
			comments
		)
	);
};

module.exports = {
	retrieveAll,
};
