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

module.exports = {
	getPostCategories,
};
