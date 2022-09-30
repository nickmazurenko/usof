const { responseHandler } = require("../helpers/handlers");
const likesModel = require("../models/likes");

const getPostLikes = async (id, callback) => {
	const votes = await likesModel.getPostLikes(id, callback);
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

const create = async (like, callback) => likesModel.create(like, callback);

module.exports = {
	getPostLikes,
	create,
};
