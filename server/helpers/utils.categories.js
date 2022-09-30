const axios = require("axios");

const getCategoriesDescription = async (categories) => {
	const url = `https://api.stackexchange.com/2.3/tags/${categories}/wikis?site=stackoverflow`;
	const options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		json: true,
	};

	const response = await axios
		.get(url, options)
		.then((json) => json.data.items)
		.catch((error) => {
			console.log(error);
		});

	return response;
};

module.exports = {
	getCategoriesDescription,
};
