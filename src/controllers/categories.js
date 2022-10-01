const categoriesService = require("../services/categories");
const handlers = require("../helpers/handlers");
const { validationResult } = require("express-validator");
const { Category } = require("../models/categories");

const getCategories = handlers.asyncHandler(async (request, response) => {
	try {
		await categoriesService.retrieveAll((error, data) => {
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
					"An error occurred during categories retrieval",
					null
				)
			);
	}
});
const getCategory = handlers.asyncHandler(async (request, response) => {
	try {
		const { id } = request.params;
		await categoriesService.retrieveOne(id, (error, data) => {
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
					"An error occurred during category retrieval",
					null
				)
			);
	}
});

module.exports = {
	getCategories,
	getCategory,
};
