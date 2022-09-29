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
	// const categories = await PostCategoriesTemplate.findAll({
	// 	where: {
	// 		post_id: id,
	// 	},
	// 	attributes: [
	// 		"category_id",
	// 		[sequelize.literal("categories.description"), "description"],
	// 		[sequelize.literal("categories.created_at"), "createdAt"],
	// 		[sequelize.literal("categories.category_title"), "title"],
	// 	],
	// 	include: {
	// 		model: CategoriesTemplate,
	// 		where: {
	// 			id: sequelize.col("postcategories.category_id"),
	// 		},
	// 		attributes: [],
	// 	},
	// 	group: ["category_id", "categories.id"],
	// }).catch((error) => {
	// 	console.log(error);
	// 	return callback(
	// 		handlers.responseHandler(
	// 			false,
	// 			500,
	// 			"An error occurred during categories retrieval",
	// 			null
	// 		),
	// 		null
	// 	);
	// });

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

module.exports = {
	getPostCategories,
};
