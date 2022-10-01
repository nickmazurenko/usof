const commentsService = require("../services/comments");
const handlers = require("../helpers/handlers");
const { validationResult } = require("express-validator");

const getComment = handlers.asyncHandler(async (request, response) => {
	try {
		const { id } = request.params;
		await commentsService.retrieveOne(id, (error, data) => {
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
					"An error occurred during comment retrieval",
					null
				)
			);
	}
});

const updateComment = handlers.asyncHandler(async (request, response) => {
	try {
		const { id } = request.params;
		const params = {
			commentId: id,
			comment: { content: request.body.content },
		};
		await commentsService.update(params, (error, data) => {
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
					"An error occurred during comment update",
					null
				)
			);
	}
});

const removeComment = handlers.asyncHandler(async (request, response) => {
	const errors = validationResult(request);
	if (errors.isEmpty()) {
		try {
			const { id } = request.params;

			await commentsService.remove(id, (error, data) => {
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
						"An error occurred during comment deletion",
						null
					)
				);
		}
	} else {
		return response
			.status(400)
			.json(handlers.responseHandler(false, 400, errors.array()[0].msg, null));
	}
});

module.exports = {
	updateComment,
	removeComment,
	getComment,
};
