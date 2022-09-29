const handlers = require("../helpers/handlers");
const { Post } = require("../models/posts");
const postsService = require("../services/posts");
const { validationResult } = require("express-validator");

const getPosts = handlers.asyncHandler(async (request, response) => {
	try {
		await postsService.retrieveAll((error, data) => {
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
					"An error occurred during all posts retrieval",
					null
				)
			);
	}
});

const getPost = handlers.asyncHandler(async (request, response) => {
	try {
		const { id } = request.params;
		await postsService.retrieveOne(id, (error, data) => {
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
					"An error occurred during post retrieval",
					null
				)
			);
	}
});

module.exports = {
	getPosts,
	getPost,
};
