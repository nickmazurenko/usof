const { Comments, Posts } = require("../tables");
const { responseHandler } = require("../helpers/handlers");

/**
 * @desc checks if the user is owner of comment or post
 * @param {*} request
 * @param {*} response
 * @param {*} callback
 */
const checkIfOwner = async (request, response, callback) => {
	let model;
	const url = request.originalUrl;
	const { id } = request.params;
	if (url.includes("posts")) {
		model = Posts;
	} else if (url.includes("comments")) {
		model = Comments;
	} else {
		callback();
	}

	const data = await model
		.findOne({
			where: { id },
			attributes: ["userId"],
		})
		.catch((error) => {
			console.log(error);
			return response
				.status(500)
				.json(
					responseHandler(
						false,
						500,
						"An error occurred during ownership check",
						null
					)
				);
		});

	if (data === null) {
		return response
			.status(404)
			.json(responseHandler(false, 500, "No such item", null));
	}

	if (data.userId !== request.user.id && request.user.role !== "admin") {
		return response
			.status(403)
			.json(
				responseHandler(false, 403, "You have no permission for that", null)
			);
	}
	if (data.userId === request.user.id) {
		request.user.isOwner = true;
	} else {
		request.user.isOwner = false;
	}

	callback();
};

/**
 * @desc Checks if user is admin [but auth is required before]
 * @param {*} request
 * @param {*} response
 * @param {*} callback
 * @returns
 */
const checkIfAdmin = async (request, response, callback) => {
	const user = request.user;

	if (user.role !== "admin") {
		return response
			.status(403)
			.json(
				responseHandler(false, 403, "You have no permission for that", null)
			);
	}
	callback();
};

module.exports = {
	checkIfOwner,
	checkIfAdmin,
};
