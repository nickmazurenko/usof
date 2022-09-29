const commentsService = require("../services/comments");
const handlers = require("../helpers/handlers");
const { validationResult } = require("express-validator");
const { Comment } = require("../models/comments");

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

const createComment = handlers.asyncHandler(async (request, response) => {
	const errors = validationResult(request);
	if (errors.isEmpty()) {
		try {
			const comment = Comment({
				content: request.body.content,
				userId: request.user.id,
				postId: request.params.id,
			});

			await commentsService.create(comment, (error, data) => {
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
						"An error occurred during comment creation",
						null
					)
				);
		}
	}
	return response
		.status(400)
		.json(handlers.responseHandler(false, 400, errors.array()[0].msg, null));
});

module.exports = {
	getComments,
	createComment,
};
