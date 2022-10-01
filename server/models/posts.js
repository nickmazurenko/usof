const {
	UsersTemplate,
	PostsTemplate,
	AnswersTemplate,
	CommentsTemplate,
	CategoriesTemplate,
} = require("../templates");
const sequelize = require("sequelize");
const handlers = require("../helpers/handlers");
const { dbResponse } = require("../helpers/db");

const Post = (post) => ({
	title: post.title,
	content: post.content,
	userId: post.userId,
	categories: post.categories,
});

const PostFull = (rawData, userRole, isOwner) => ({
	...(rawData.title && isOwner ? { title: rawData.title } : {}),
	...(rawData.content && isOwner ? { content: rawData.content } : {}),
	...(rawData.categories ? { categories: rawData.categories } : {}),
	...(rawData.status && userRole === "admin" ? { status: rawData.status } : {}),
});

const countAnswers = async (id) =>
	await PostsTemplate.count({
		where: {
			id,
		},
		include: {
			model: AnswersTemplate,
			required: false,
			attributes: [],
		},
	}).catch((error) => {
		console.log(error);
		throw new Error(error);
	});

const countComments = async (id) =>
	await PostsTemplate.count({
		where: {
			id,
		},
		include: {
			model: CommentsTemplate,
			required: false,
			attributes: [],
		},
	}).catch((error) => {
		console.log(error);
		throw new Error(error);
	});

const countAll = async (categoryName = "") => {
	const include = [
		{
			model: AnswersTemplate,
			required: false,
			attributes: [],
		},
		{
			model: CommentsTemplate,
			required: false,
			attributes: [],
		},
	];
	const where = {};
	if (categoryName !== "") {
		where = { "$categories.categoryName$": categoryName };

		include.push({
			model: CategoriesTemplate,
			required: false,
			attributes: [],
		});
	}
	const result = await PostsTemplate.findAll({
		distinct: true,
		where,
		attributes: [
			"id",
			[sequelize.literal("COUNT(DISTINCT(comments.id))"), "commentsCount"],
			[sequelize.literal("COUNT(DISTINCT(answers.id))"), "answersCount"],
		],
		include,
		group: ["id"],
		order: [["created_at", "DESC"]],
	}).catch((error) => {
		console.log(error);
		throw new Error(error);
	});

	return result;
};

const retrieveOne = async (id) => {
	let post = await PostsTemplate.findOne({
		distinct: true,
		where: {
			id,
		},
		attributes: [
			"id",
			"userId",
			[sequelize.literal("user.profile_picture"), "profilePicture"],
			[sequelize.literal("user.login"), "login"],
			"title",
			["content", "postContent"],
			"createdAt",
			"updatedAt",
			"views",
		],
		include: [
			{
				model: CategoriesTemplate,
				required: false,
				attributes: ["id", "categoryTitle"],
			},
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

	if (post === null) {
		throw new Error("No post with such id");
	}

	return dbResponse(
		post,
		"id",
		"userId",
		"profilePicture",
		"login",
		"title",
		"postContent",
		"createdAt",
		"updatedAt",
		"views",
		"categories"
	);
};

const retrieveAll = async (categoryName = "") => {
	const where =
		categoryName === "" ? {} : { "$categories.categoryName$": categoryName };
	const postsRaw = await PostsTemplate.findAll({
		distinct: true,
		where,
		attributes: [
			"id",
			"userId",
			"views",
			"createdAt",
			"updatedAt",
			"title",
			"content",
			[sequelize.literal("user.login"), "login"],
			[sequelize.literal("user.profile_picture"), "profilePicture"],
		],
		include: [
			{
				model: CategoriesTemplate,
				required: false,
				attributes: ["id", "categoryTitle"],
			},
			{
				model: UsersTemplate,
				required: false,
				attributes: [],
			},
		],
		order: [["createdAt", "DESC"]],
	}).catch((error) => {
		console.log(error);
		throw new Error("An error occurred during posts retrieval");
	});

	const posts = postsRaw.map((post) =>
		dbResponse(
			post,
			"id",
			"userId",
			"profilePicture",
			"login",
			"title",
			"postContent",
			"createdAt",
			"updatedAt",
			"views",
			"categories"
		)
	);
	if (posts.length === 0) {
		throw new Error("No posts were found");
	}

	return posts;
};

const addViewsId = async (id) => {
	await PostsTemplate.increment("views", {
		by: 1,
		where: { id },
	}).catch((error) => {
		console.log(error);
		throw new Error(error);
	});
};

const create = async (post, callback) =>
	await PostsTemplate.create({
		title: post.title,
		user_id: post.userId,
		content: post.content,
	}).catch((error) => {
		console.log(error);
		callback(
			handlers.responseHandler(
				false,
				500,
				"An error occurred during post creation",
				null
			),
			null
		);
		return null;
	});

const update = async (id, newData, callback) =>
	await PostsTemplate.update(newData, {
		where: { id },
		returning: true,
		plain: true,
	}).catch((error) => {
		console.log(error);
		callback(
			handlers.responseHandler(
				false,
				500,
				"An error occurred during post update",
				null
			),
			null
		);
		return null;
	});

module.exports = {
	Post,
	PostFull,
	retrieveOne,
	retrieveAll,
	countAll,
	countAnswers,
	countComments,
	addViewsId,
	create,
	update,
};
