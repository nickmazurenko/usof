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
		if (url.includes("answers")) {
			template = AnswersTemplate;
		} else if (url.includes("comments")) {
			template = CommentsTemplate;
		} else {
			template = PostsTemplate;
		}
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
			.json(responseHandler(false, 500, "No such user", null));
	}

	if (data.userId !== request.user.id) {
		return response
			.status(403)
			.json(
				responseHandler(false, 403, "You have no permission for that", null)
			);
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
};

module.exports = {
	checkOwnership,
	checkIfAdmin,
};
