const axios = require('axios');

/**
 * @desc Fetches categories descriptions from stackexchange
 * @param {String} categories categories separated by [ ; ]
 * @returns an array with given categories titles and their description
 */
const getCategoriesDescription = async (categories) => {
  const url = `https://api.stackexchange.com/2.3/tags/${categories}/wikis?site=stackoverflow`;
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
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
