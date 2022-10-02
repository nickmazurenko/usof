const { PostsTemplate, CategoriesTemplate } = require("../templates");
const handlers = require("../helpers/handlers");

const getPostCategories = async (id, callback) => {
	const post = await PostsTemplate.findByPk(id, {
		include: [
			{
				model: CategoriesTemplate,
				as: "categories",
				attributes: ["id", "categoryTitle", "description"],
				through: {
					attributes: [],
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

const retrieveAll = async () => {
	return await CategoriesTemplate.findAll();
};

const retrieveOne = async (params) => {
	return await CategoriesTemplate.findOne({
		where: params,
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

const create = async (category) =>
	await CategoriesTemplate.create(category).catch((error) => {
		console.log(error);
		throw new Error(error);
	});

const update = async (category, id) => {
	await CategoriesTemplate.update(category, { where: { id } }).catch(
		(error) => {
			console.log(error);
			throw new Error(error);
		}
	);
};

const remove = async (id) => {
	await CategoriesTemplate.destroy({ where: { id } }).catch((error) => {
		console.log(error);
		throw new Error(error);
	});
};

module.exports = {
	getPostCategories,
	retrieveOne,
	createMultiple,
	retrieveAll,
	create,
	update,
	remove,
};
