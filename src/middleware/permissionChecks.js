const {
	CommentsTemplate,
	AnswersTemplate,
	PostsTemplate,
} = require("../templates");
const { responseHandler } = require("../helpers/handlers");

const checkIfOwner = async (request, response, callback) => {
	let template;
	const url = request.originalUrl;
	const { id } = request.params;
	if (url.includes("posts")) {
		template = PostsTemplate;
	} else if (url.includes("comments")) {
		template = CommentsTemplate;
	} else {
		callback();
	}

	const data = await template
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
