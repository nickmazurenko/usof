const { responseHandler } = require("../helpers/handlers");
const commentsModel = require("../models/comments");
const likesModel = require("../models/likes");

const retrieveAll = async (id, callback) => {
	const commentsRaw = await commentsModel.retrieveAll(id, callback);
	const commentsInfo = await Promise.all(
		commentsRaw.map(async (comment) => {
			let likesCount = 0;
			let dislikesCount = 0;
			let likes;
			let dislikes;
			const votes = await likesModel.getCommentLikes(comment.id, (error) => {
				if (error) console.log(error);
			});
			if (votes) {
				likes = votes.filter((vote) => vote.type === "like");
				likesCount = likes.length;
				dislikes = votes.filter((vote) => vote.type === "dislike");
				dislikesCount = dislikes.length;
			}

			return {
				...comment,
				likes,
				dislikes,
				likesCount,
				dislikesCount,
			};
		})
	);
	return callback(
		responseHandler(true, 200, "Comments retrieval successful", commentsInfo)
	);
};

const create = async (comment, callback) =>
	await commentsModel.create(comment, callback);

module.exports = {
	retrieveAll,
	create,
};
