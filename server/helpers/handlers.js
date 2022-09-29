/**
 *
 * @param {Bool} success
 * @param {Number} code
 * @param {String} message
 * @param {Object} data
 * @returns object created with given data
 * for future usage in response
 */
const responseHandler = (success, code = 400, message = "valid", data) => {
	return {
		success,
		code,
		message,
		data,
	};
};


const asyncHandler = (callback) => (request, response, next) =>
	Promise.resolve(callback(request, response, next)).catch((error) => {
		console.log(error);
		responseHandler(false, 500, "Error on server occurred", null);
	});

module.exports = handlers = {
	responseHandler,
	asyncHandler,
};
