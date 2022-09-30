const {
	PostsTemplate,
	CategoriesTemplate,
	PostCategoriesTemplate,
} = require("../templates");
const handlers = require("../helpers/handlers");
const sequelize = require("sequelize");
const { dbResponse } = require("../helpers/db");
const { response } = require("express");

const getPostCategories = async (id, callback) => {
	const post = await PostsTemplate.findByPk(id, {
		include: [
			{
				model: CategoriesTemplate,
				as: "categories",
				attributes: ["id", "categoryTitle", "description"],
				through: {
					attributes: ["post_id", "category_id"],
				},
			},
		],
	});

	const categories = post.categories;
	if (categories.length === 0) {
		return callback(
			handlers.responseHandler(
				false,
				404,
				"No categories for post with this id",
				null
			),
			null
		);
	}

	return callback(
		null,
		handlers.responseHandler(
			true,
			200,
			"Categories retrieval for post successful",
			categories
		)
	);
};

const retrieveOne = async (categoryTitle) => {
	return await CategoriesTemplate.findOne({
		where: {
			categoryTitle,
		},
	}).catch((error) => {
		console.log(error);
		throw new Error("No such category");
	});
};

const createMultiple = async (categories) =>
	await CategoriesTemplate.bulkCreate(categories).catch((error) => {
		console.log(error);
		throw new Error("An error occurred during multiple categories creation");
	});

module.exports = {
	getPostCategories,
	retrieveOne,
	createMultiple,
};
