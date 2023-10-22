/**
 * @desc creates object from values under given params from template
 * @param {Object} template
 * @param  {...String} params
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
