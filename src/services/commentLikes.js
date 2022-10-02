const { responseHandler } = require("../helpers/handlers");
const likesModel = require("../models/likes");
const commentsModel = require("../models/comments");
const usersModel = require("../models/users");

const getCommentLikes = async (id, callback) => {
	const votes = await likesModel.getCommentLikes(id, callback);
	const likes = votes.filter((vote) => vote.type === "like");
	const likesCount = likes.length;
	const dislikes = votes.filter((vote) => vote.type === "dislike");
	const dislikesCount = dislikes.length;

	const result = {
		likesCount,
		dislikesCount,
		likes,
		dislikes,
	};

	return callback(
		null,
		responseHandler(true, 200, "Likes retrieval successful", result)
	);
};

const create = async (like, callback) => {
	const { type, ...params } = like;
	const comment = await commentsModel.retrieveOne(like.comment_id);
	const dbLike = await likesModel.retrieveOne(params);
	if (!dbLike && dbLike?.type !== type && comment.userId !== like.user_id) {
		if (type === "like") {
			await usersModel.addRatingId(comment.userId);
		} else {
			await usersModel.removeRatingId(comment.userId);
		}
	}
	await likesModel.create(like, callback);
};
const remove = async (params, callback) => {
	const comment = await commentsModel.retrieveOne(params.commentId);
	const like = await likesModel.retrieveOne(params);
	if (comment.userId !== params.userId) {
		if (like.type === "like") {
			await usersModel.removeRatingId(comment.userId);
		} else {
			await usersModel.addRatingId(comment.userId);
		}
	}

	likesModel.remove(params, callback);
};
module.exports = {
	getCommentLikes,
	create,
	remove,
};
