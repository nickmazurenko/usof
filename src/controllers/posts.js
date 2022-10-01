const handlers = require("../helpers/handlers");
const { Post, PostFull } = require("../models/posts");
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

const createPost = handlers.asyncHandler(async (request, response) => {
	const errors = validationResult(request);
	if (errors.isEmpty()) {
		try {
			request.body.userId = request.user.id;
			const post = Post(request.body);
			await postsService.create(post, (error, data) => {
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
						"An error occurred during post creation",
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

const updatePost = handlers.asyncHandler(async (request, response) => {
	try {
		const { id } = request.params;
		const params = {
			postId: id,
			post: PostFull(request.body, request.user.role, request.user.isOwner),
		};
		await postsService.update(params, (error, data) => {
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
					"An error occurred during post update",
					null
				)
			);
	}
});

const removePost = handlers.asyncHandler(async (request, response) => {
	try {
		const { id } = request.params;

		await postsService.remove(id, (error, data) => {
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
					"An error occurred during post deletion",
					null
				)
			);
	}
});

module.exports = {
	getPosts,
	getPost,
	createPost,
	updatePost,
	removePost,
};
