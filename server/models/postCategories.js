const { PostCategoriesTemplate } = require("../templates");

const createMultiple = async (postCategories) =>
	await PostCategoriesTemplate.bulkCreate(postCategories).catch((error) => {
		console.log(error);
		throw new Error("An error occurred during multiple categories creation");
	});

module.exports = {
	createMultiple,
};
