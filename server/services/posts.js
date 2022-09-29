const handlers = require("../helpers/handlers");
const PostsModel = require("../models/posts");
const { dbResponse } = require("../helpers/db");

const retrieveAll = async (callback) => {
	const posts = await PostsModel.retrieveAll();
	const postsRawInfo = await PostsModel.countAll();

	const postsInfo = postsRawInfo.map((post) => {
		return dbResponse(post, "id", "commentsCount", "answersCount");
	});
	console.log(postsInfo);
	const postsWithInfo = posts.map((post) => ({
		...postsInfo.find((info) => info && info.id === post.id),
		...post,
	}));
	return callback(
		null,
		handlers.responseHandler(
			true,
			200,
			"All posts successfully retrieved",
			postsWithInfo
		)
	);
};

const retrieveOne = async (id, callback) => {
	await PostsModel.addViewsId(id);
	const post = await PostsModel.retrieveOne(id);
	const answers = await PostsModel.countAnswers(id);
	const comments = await PostsModel.countComments(id);
	const postWithInfo = {
		...post,
		answersCount: answers,
		commentsCount: comments,
	};
	return callback(
		null,
		handlers.responseHandler(
			true,
			200,
			"Post successfully retrieved",
			postWithInfo
		)
	);
};

module.exports = {
	retrieveOne,
	retrieveAll,
};
