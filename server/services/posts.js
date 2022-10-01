const handlers = require("../helpers/handlers");
const PostsModel = require("../models/posts");
const { dbResponse } = require("../helpers/db");
const db = require("../config/db.config");
const { getCategoriesDescription } = require("../helpers/utils.categories");
const categoriesModel = require("../models/categories");
const postCategoriesModel = require("../models/postCategories");
const likesModel = require("../models/likes");
const retrieveAll = async (callback) => {
	const posts = await PostsModel.retrieveAll();
	const postsRawInfo = await PostsModel.countAll();

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
	let hasLikes = true;
	let likesCount = 0;
	let dislikesCount = 0;
	let likes;
	let dislikes;
	await PostsModel.addViewsId(id);
	const post = await PostsModel.retrieveOne(id);
	const answers = await PostsModel.countAnswers(id);
	const comments = await PostsModel.countComments(id);
	const votes = await likesModel.getPostLikes(id, (error) => {
		if (error) hasLikes = false;
	});
	if (votes) {
		likes = votes.filter((vote) => vote.type === "like");
		likesCount = likes.length;
		dislikes = votes.filter((vote) => vote.type === "dislike");
		dislikesCount = dislikes.length;
	}
	const postWithInfo = {
		...post,
		answersCount: answers,
		commentsCount: comments,
		likes,
		dislikes,
		likesCount,
		dislikesCount,
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

const create = async (post, callback) => {
	let transaction;
	try {
		transaction = await db.transaction();
		const categories = post.categories
			.split(",")
			.map((category) => category.trim());
		if (categories.length < 2) {
			return callback(
				handlers.responseHandler(
					false,
					400,
					"There should be at least two categories",
					null
				),
				null
			);
		}

		const dbPost = await PostsModel.create(post, callback);
		const allCategories = [];
		const newCategoriesRaw = [];
		for (const category of categories) {
			const dbCategory = await categoriesModel.retrieveOne(category);
			if (dbCategory !== null) {
				allCategories.push({
					post_id: dbPost.id,
					category_id: dbCategory.id,
				});
			} else {
				newCategoriesRaw.push(category);
			}
		}

		const newCategoriesStr = newCategoriesRaw.join(";");
		let categoriesDescription;
		if (newCategoriesStr.length) {
			categoriesDescription = await getCategoriesDescription(newCategoriesStr);
		}
		const newCategories = [];
		for (const title of newCategoriesRaw) {
			const found =
				categoriesDescription.length &&
				categoriesDescription.find(
					(item) => item.tag_name === title.toLowerCase()
				);
			const object = {
				categoryTitle: title,
				description: "",
			};
			if (!found) {
				object.description = `${title} is a general category`;
			} else {
				object.description = found.excerpt;
			}
			newCategories.push(object);
		}

		const dbNewCategories = await categoriesModel.createMultiple(newCategories);
		for (const category of dbNewCategories) {
			allCategories.push({
				post_id: dbPost.id,
				category_id: category.id,
			});
		}

		await postCategoriesModel.createMultiple(allCategories);

		callback(
			null,
			handlers.responseHandler(true, 200, "Post creation successful", dbPost.id)
		);
		await transaction.commit();
	} catch (error) {
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
		if (transaction) {
			transaction.rollback();
		}
	}
};

const update = async ({ postId, post }, callback) => {
	let transaction;
	try {
		console.log(post);
		transaction = await db.transaction();
		let dbPost;
		if (post.categories) {
			await postCategoriesModel.deleteMultiple(postId);
			const categories = post.categories
				.split(",")
				.map((category) => category.trim());
			if (categories.length < 2) {
				return callback(
					handlers.responseHandler(
						false,
						400,
						"There should be at least two categories",
						null
					),
					null
				);
			}

			dbPost = await PostsModel.update(postId, post, callback);

			const allCategories = [];
			const newCategoriesRaw = [];
			for (const category of categories) {
				const dbCategory = await categoriesModel.retrieveOne(category);
				if (dbCategory !== null) {
					allCategories.push({
						post_id: postId,
						category_id: dbCategory.id,
					});
				} else {
					newCategoriesRaw.push(category);
				}
			}

			const newCategoriesStr = newCategoriesRaw.join(";");
			let categoriesDescription;
			if (newCategoriesStr.length) {
				categoriesDescription = await getCategoriesDescription(
					newCategoriesStr
				);
			}
			const newCategories = [];
			for (const title of newCategoriesRaw) {
				const found =
					categoriesDescription.length &&
					categoriesDescription.find(
						(item) => item.tag_name === title.toLowerCase()
					);
				const object = {
					categoryTitle: title,
					description: "",
				};
				if (!found) {
					object.description = `${title} is a general category`;
				} else {
					object.description = found.excerpt;
				}
				newCategories.push(object);
			}

			const dbNewCategories = await categoriesModel.createMultiple(
				newCategories
			);
			for (const category of dbNewCategories) {
				allCategories.push({
					post_id: postId,
					category_id: category.id,
				});
			}

			await postCategoriesModel.createMultiple(allCategories);
		} else {
			dbPost = await PostsModel.update(postId, post, callback);
		}

		callback(
			null,
			handlers.responseHandler(true, 200, "Post update successful", dbPost.id)
		);
		await transaction.commit();
	} catch (error) {
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
		if (transaction) {
			transaction.rollback();
		}
	}
};

module.exports = {
	retrieveOne,
	retrieveAll,
	create,
	update,
};
