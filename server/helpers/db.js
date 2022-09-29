/**
 *
 * @param {Object} template
 * @param  {...any} params
 * @returns data from database fitting given conditions in params
 */
const dbResponse = (template, ...params) => {
	const result = {};

	params.forEach((key) => {
		result[key] = template.getDataValue(key);
	});
	return result;
};

module.exports = array = {
	dbResponse,
};
