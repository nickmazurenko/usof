const { PostCategoriesTemplate } = require("../templates");

const createMultiple = async (postCategories) =>
	await PostCategoriesTemplate.bulkCreate(postCategories).catch((error) => {
		console.log(error);
		throw new Error(
			"An error occurred during multiple post categories creation"
		);
	});

const deleteMultiple = async (post_id) => {
	await PostCategoriesTemplate.destroy({ where: { post_id } }).catch(
		(error) => {
			console.log(error);
			throw new Error(
				"An error occurred during multiple post categories deletion"
			);
		}
	);
};

module.exports = {
	createMultiple,
	deleteMultiple,
};
