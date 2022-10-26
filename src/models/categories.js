const sequelize = require('sequelize');
const { Posts, Categories, PostCategories } = require('../tables');
const handlers = require('../helpers/handlers');

const getPostCategories = async (id, callback) => {
  const post = await Posts.findByPk(id, {
    include: [
      {
        model: Categories,
        as: 'categories',
        attributes: ['id', 'categoryTitle', 'description'],
        through: {
          attributes: [],
        },
      },
    ],
  });

  const { categories } = post;
  if (categories.length === 0) {
    return callback(
      handlers.responseHandler(
        false,
        404,
        'No categories for post with this id',
        null,
      ),
      null,
    );
  }

  return callback(
    null,
    handlers.responseHandler(
      true,
      200,
      'Categories retrieval for post successful',
      categories,
    ),
  );
};

const retrieveAll = async () =>
  await Categories.findAll({
    attributes: [
      ['category_title', 'title'],
      'description',
      'id',
      [
        sequelize.literal(`(
        SELECT COUNT(postCategories.category_id)
        FROM postCategories
        WHERE postCategories.category_id = categories.id
      )`),
        'postsCount',
      ],
    ],
    include: [
      {
        model: PostCategories,
        required: false,
        attributes: [],
      },
    ],
  });

const retrieveOne = async (params) =>
  await Categories.findOne({
    where: params,
    attributes: [
      ['category_title', 'title'],
      'description',
      'id',
      [
        sequelize.literal(`(
        SELECT COUNT(postCategories.category_id)
        FROM postCategories
        WHERE postCategories.category_id = categories.id
      )`),
        'postsCount',
      ],
    ],
    include: [
      {
        model: PostCategories,
        required: false,
        attributes: [],
      },
    ],
  }).catch((error) => {
    console.log(error);
    throw new Error('No such category');
  });

const createMultiple = async (categories) =>
  await Categories.bulkCreate(categories).catch((error) => {
    console.log(error);
    throw new Error('An error occurred during multiple categories creation');
  });

const create = async (category) =>
  await Categories.create(category).catch((error) => {
    console.log(error);
    throw new Error(error);
  });

const update = async (category, id) => {
  await Categories.update(category, { where: { id } }).catch((error) => {
    console.log(error);
    throw new Error(error);
  });
};

const remove = async (id) => {
  await Categories.destroy({ where: { id } }).catch((error) => {
    console.log(error);
    throw new Error(error);
  });
};

module.exports = {
  getPostCategories,
  retrieveOne,
  createMultiple,
  retrieveAll,
  create,
  update,
  remove,
};
