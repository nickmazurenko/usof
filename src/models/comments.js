const { CommentsTemplate, UsersTemplate } = require("../templates");
const handlers = require("../helpers/handlers");
const sequelize = require("sequelize");
const { dbResponse } = require("../helpers/db");
const { response } = require("express");

const Comment = (comment) => ({
	content: comment.content,
	user_id: comment.userId,
	post_id: comment.postId,
});

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
				"An error occurred during comments retrieval",
				null
			),
			null
		);
	});

	const comments = commentsRaw.map((comment) =>
		dbResponse(
			comment,
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

const retrieveOne = async (id) => {
	let comment = await CommentsTemplate.findOne({
		distinct: true,
		where: {
			id,
		},
		attributes: [
			"id",
			"userId",
			"postId",
			[sequelize.literal("user.profile_picture"), "profilePicture"],
			[sequelize.literal("user.login"), "login"],
			["content", "commentContent"],
			"createdAt",
			"updatedAt",
		],
		include: [
			{
				model: UsersTemplate,
				required: false,
				attributes: [],
			},
		],
	}).catch((error) => {
		console.log(error);
		throw new Error(error);
	});

	if (comment === null) {
		throw new Error("No post with such id");
	}

	return dbResponse(
		comment,
		"id",
		"postId",
		"userId",
		"profilePicture",
		"login",
		"commentContent",
		"createdAt",
		"updatedAt"
	);
};

const create = async (comment, callback) => {
	const dbComment = await CommentsTemplate.create(comment).catch((error) => {
		console.log(error);
		return callback(
			handlers.responseHandler(
				false,
				500,
				"An error occurred during comment creation",
				null
			),
			null
		);
	});
	return callback(
		null,
		handlers.responseHandler(
			true,
			200,
			"Comment creation successful",
			dbComment.id
		)
	);
};

const removePostComments = async (post_id) => {
	await CommentsTemplate.destroy({ where: { post_id } }).catch((error) => {
		console.log(error);
		throw new Error(error);
	});
};

const update = async (id, newData) =>
	await CommentsTemplate.update(newData, {
		where: { id },
		returning: true,
		plain: true,
	}).catch((error) => {
		console.log(error);
		throw new Error(error);
	});

const remove = async (id) => {
	await CommentsTemplate.destroy({ where: { id } }).catch((error) => {
		console.log(error);
		throw new Error(error);
	});
};

module.exports = {
	Comment,
	retrieveAll,
	retrieveOne,
	create,
	update,
	remove,
	removePostComments,
};
