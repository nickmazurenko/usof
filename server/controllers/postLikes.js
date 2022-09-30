const postLikesService = require("../services/postLikes");
const handlers = require("../helpers/handlers");
const { validationResult } = require("express-validator");

const createLike = handlers.asyncHandler(async (request, response) => {
	const errors = validationResult(request);
	if (errors.isEmpty()) {
		try {
			const like = {
				post_id: request.params.id,
				user_id: request.user.id,
				type: request.body.type,
			};
			await postLikesService.create(like, (error, data) => {
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
						"An error occurred during like creation",
						null
					)
				);
		}
	} else {
		return response
			.status(400)
			.json(handlers.responseHandler(false, 400, errors.array()[0]?.msg, null));
	}
});

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
	createLike,
};
