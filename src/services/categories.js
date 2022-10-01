const { response } = require("express");
const { responseHandler } = require("../helpers/handlers");
const categoriesModel = require("../models/categories");

const retrieveAll = async (callback) => {
	try {
		const categories = await categoriesModel.retrieveAll();
		return callback(
			null,
			responseHandler(true, 200, "Categories retrieval successful", categories)
		);
	} catch (error) {
		console.log(error);
		return callback(responseHandler(false, 404, error.msg, null), null);
	}
};
const retrieveOne = async (id, callback) => {
	try {
		const category = await categoriesModel.retrieveOne({ id });
		return callback(
			null,
			responseHandler(true, 200, "Category retrieval successful", category)
		);
	} catch (error) {
		console.log(error);
		return callback(responseHandler(false, 404, error.msg, null), null);
	}
};

module.exports = {
	retrieveAll,
	retrieveOne,
};
