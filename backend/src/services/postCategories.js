const categoriesModel = require('../models/categories');

const getPostCategories = (id, callback) => categoriesModel.getPostCategories(id, callback);

module.exports = {
  getPostCategories,
};
