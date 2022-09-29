const commentsModel = require("../models/comments");

const retrieveAll = (id, callback) => commentsModel.retrieveAll(id, callback);

module.exports = {
	retrieveAll,
};
