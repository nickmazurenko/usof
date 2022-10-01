const commentsModel = require("../models/comments");

const retrieveAll = (id, callback) => commentsModel.retrieveAll(id, callback);

const create = (comment, callback) => commentsModel.create(comment, callback);

module.exports = {
	retrieveAll,
	create,
};
