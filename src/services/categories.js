const { responseHandler } = require("../helpers/handlers");
const categoriesModel = require("../models/categories");
const postsModel = require("../models/posts");
const likesModel = require("../models/likes");
const { dbResponse } = require("../helpers/db");
const { getCategoriesDescription } = require("../helpers/utils.categories");

const retrieveAll = async (callback) => {
	try {
		const categories = await categoriesModel.retrieveAll();
		return callback(
			null,
			responseHandler(true, 200, "Categories retrieval successful", categories)
		);
	} catch (error) {
		console.log(error);
		return callback(responseHandler(false, 404, error.msg, null), null);
	}
};
const retrieveOne = async (id, callback) => {
	try {
		const category = await categoriesModel.retrieveOne({ id });
		return callback(
			null,
			responseHandler(true, 200, "Category retrieval successful", category)
		);
	} catch (error) {
		console.log(error);
		return callback(responseHandler(false, 404, error.msg, null), null);
	}
};

const getCategoryPosts = async (id, callback) => {
	const category = await categoriesModel.retrieveOne({ id });
	const title = category.categoryTitle;
	const dbPosts = await postsModel.retrieveAll(title);
	const postsRawInfo = await postsModel.countAll(title);

	const postsInfo = await Promise.all(
		postsRawInfo.map(async (post) => {
			let hasLikes = true;
			let likesCount = 0;
			let dislikesCount = 0;
			let likes;
			let dislikes;
			const votes = await likesModel.getPostLikes(post.id, (error) => {
				if (error) hasLikes = false;
			});
			if (votes) {
				likes = votes.filter((vote) => vote.type === "like");
				likesCount = likes.length;
				dislikes = votes.filter((vote) => vote.type === "dislike");
				dislikesCount = dislikes.length;
			}
			return {
				...dbResponse(post, "id", "commentsCount", "answersCount"),
				likes,
				dislikes,
				likesCount,
				dislikesCount,
			};
		})
	);
	const postsWithInfo = dbPosts.map((post) => ({
		...postsInfo.find((info) => info && info.id === post.id),
		...post,
	}));
	return callback(
		null,
		handlers.responseHandler(
			true,
			200,
			`All posts from ${title} retrieved`,
			postsWithInfo
		)
	);
};

const create = async (category, callback) => {
	try {
		const dbCategory = await categoriesModel.retrieveOne({
			categoryTitle: category.categoryTitle,
		});
		if (dbCategory) {
			return callback(
				responseHandler(
					false,
					404,
					"Category with such title already exists",
					null
				),
				null
			);
		}
		if (!category.description) {
			const description = await getCategoriesDescription(
				category.categoryTitle
			);
			if (description.length) {
				category.description = description[0].excerpt;
			} else {
				category.description = `${category.categoryTitle} is a general category`;
			}
		}

		const result = await categoriesModel.create(category);
		return callback(
			null,
			responseHandler(true, 200, "Category successfully created", result.id)
		);
	} catch (error) {
		console.log(error);
		return callback(responseHandler(false, 404, error.msg, null), null);
	}
};

const update = async ({ category, id }, callback) => {
	try {
		await categoriesModel.update(category, id);
		return callback(
			null,
			responseHandler(true, 200, "Category successfully updated", null)
		);
	} catch (error) {
		console.log(error);
		return callback(responseHandler(false, 404, error.msg, null), null);
	}
};
const remove = async (id, callback) => {
	try {
		await categoriesModel.remove(id);
		return callback(
			null,
			responseHandler(true, 200, "Category successfully updated", null)
		);
	} catch (error) {
		console.log(error);
		return callback(responseHandler(false, 404, error.msg, null), null);
	}
};

module.exports = {
	retrieveAll,
	retrieveOne,
	getCategoryPosts,
	create,
	update,
	remove,
};
