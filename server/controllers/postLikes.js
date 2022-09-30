const postLikesService = require("../services/postLikes");
const handlers = require("../helpers/handlers");
const { validationResult } = require("express-validator");

const getPostLikes = handlers.asyncHandler(async (request, response) => {
	try {
		const { id } = request.params;
		await postLikesService.getPostLikes(id, (error, data) => {
			if (error) {
				console.log(error);
				return response.status(error.code).json(error);
			}
			return response.status(data.code).json(data);
		});
	} catch (error) {
		console.log(error);
		return response
			.status(500)
			.json(
				handlers.responseHandler(
					false,
					500,
					"An error occurred during likes retrieval",
					null
				)
			);
	}
});

module.exports = {
	getPostLikes,
};
