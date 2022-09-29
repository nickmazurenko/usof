const commentsService = require("../services/comments");
const handlers = require("../helpers/handlers");
const { validationResult } = require("express-validator");

const getComments = handlers.asyncHandler(async (request, response) => {
	try {
		const { id } = request.params;
		await commentsService.retrieveAll(id, (error, data) => {
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
					"An error occurred during comments retrieval",
					null
				)
			);
	}
});

module.exports = {
	getComments,
};
