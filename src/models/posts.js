const {
	UsersTemplate,
	PostsTemplate,
	CommentsTemplate,
	CategoriesTemplate,
	LikesTemplate,
} = require("../templates");
const sequelize = require("sequelize");
const handlers = require("../helpers/handlers");
const { dbResponse } = require("../helpers/db");
const { getPagingData, getPagination } = require("../helpers/pagination");

/**
 * Post template for creation
 * @param {Object} post
 * @returns
 */
const Post = (post) => ({
	title: post.title,
	content: post.content,
	userId: post.userId,
	categories: post.categories,
});

/**
 * Post template for update depending on permissions
 * @param {Object} rawData raw post data
 * @param {String} userRole user role [admin, user]
 * @param {Boolean} isOwner if user is owner of post
 * @returns
 */
const PostFull = (rawData, userRole, isOwner) => ({
	...(rawData.title && isOwner ? { title: rawData.title } : {}),
	...(rawData.content && isOwner ? { content: rawData.content } : {}),
	...(rawData.categories ? { categories: rawData.categories } : {}),
	...(rawData.status && userRole === "admin" ? { status: rawData.status } : {}),
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

/**
 * @desc Counts categories and comments
 * @param {*} categoryTitle
 * @returns
 */
const countAll = async (categoryTitle = "") => {
	const include = [
		{
			model: CommentsTemplate,
			required: false,
			attributes: [],
		},
	];
	let where = {};
	if (categoryTitle !== "") {
		where = { "$categories.category_title$": categoryTitle };

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

/**
 * @desc Fetching post data under given id
 * @param {String} id
 * @returns fetched post
 */
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
		"categories",
		"status"
	);
};

/**
 * @desc Fetches all existing posts
 * @param {String} categoryTitle [optional] category name to filter posts
 * @returns
 */
const retrieveAll = async ({ user, sort, page }, categoryTitle = "") => {
	const where = {
		...(categoryTitle === ""
			? {}
			: { "$categories.category_title$": categoryTitle }),
		...(user
			? {
					[sequelize.Op.or]: [
						{ status: "active" },
						{
							status: "inactive",
							...(user.role === "user" ? { user_id: user.id } : {}),
						},
					],
			  }
			: { status: "active" }),
	};
	const { limit, offset } = getPagination(page);
	const postsRaw = await PostsTemplate.findAndCountAll({
		limit,
		offset,
		subQuery: false,
		where,
		attributes: [
			"id",
			"userId",
			"views",
			"createdAt",
			"updatedAt",
			"title",
			"content",
			"status",
			[sequelize.literal("user.login"), "login"],
			[sequelize.literal("user.profile_picture"), "profilePicture"],
			[
				sequelize.literal(`(
					SELECT COUNT(likes.id)
					FROM likes
					WHERE likes.post_id = posts.id
				)`),
				'like_count',
			],
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
			{
				model: LikesTemplate,
				required: false,
				attributes: [],
			},
		],
		group: ["posts.id"],
		order: [[sort ? sort : "like_count", "DESC"]],
	}).catch((error) => {
		console.log(error);
		throw new Error("An error occurred during posts retrieval");
	});
	const pagingData = getPagingData(postsRaw, page);
	pagingData.posts = pagingData.posts.map((post) =>
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
			"categories",
			"status"
		)
	);
	if (pagingData.posts.length === 0) {
		throw new Error("No posts were found");
	}

	return pagingData;
};

/**
 * @desc Adds views to a given post
 * @param {*} id
 */
const addViewsId = async (id) => {
	await PostsTemplate.increment("views", {
		by: 1,
		where: { id },
	}).catch((error) => {
		console.log(error);
		throw new Error(error);
	});
};

/**
 * @desc Creation post
 * @param {Object} post post data
 * @param {Function} callback
 * @returns created post
 */
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

/**
 * @desc updating post under given id
 * @param {String} id post id
 * @param {Object} newData post data
 * @param {Function} callback
 */
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

/**
 * @desc Removing post under given id
 * @param {String} id post id
 */
const remove = async (id) => {
	await PostsTemplate.destroy({ where: { id } }).catch((error) => {
		console.log(error);
		throw new Error(error);
	});
};

module.exports = {
	Post,
	PostFull,
	retrieveOne,
	retrieveAll,
	countAll,
	countComments,
	addViewsId,
	create,
	update,
	remove,
};
