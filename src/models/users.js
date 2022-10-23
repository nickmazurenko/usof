const sequelize = require('sequelize');
const { Users, Posts, Categories, Comments } = require('../tables');
const { responseHandler } = require('../helpers/handlers');
const { dbResponse } = require('../helpers/db');
const { getUsersPagination, getUsersPagingData } = require('../helpers/pagination');

/**
 * user template for registration
 * @param {Object} user
 * @returns user model object fitting template
 */
const User = (user) => ({
  login: user.login,
  password: user.password,
  fullName: user.fullName,
  email: user.email,
});

/**
 * Full user template for creation route
 * @param {Object} rawData raw data to fill into template
 * @returns
 */
const UserFull = (rawData) => ({
  ...(rawData.login ? { login: rawData.login } : {}),
  ...(rawData.password ? { password: rawData.password } : {}),
  ...(rawData.fullName ? { fullName: rawData.fullName } : {}),
  ...(rawData.email ? { email: rawData.email } : {}),
  ...(rawData.rating ? { rating: rawData.rating } : {}),
  ...(rawData.views ? { views: rawData.views } : {}),
  ...(rawData.role ? { role: rawData.role } : {}),
  ...(rawData.tokenInvalidationDate
    ? { tokenInvalidationDate: rawData.tokenInvalidationDate }
    : {}),
  ...(rawData.isEmailVerified
    ? { isEmailVerified: rawData.isEmailVerified }
    : {}),
  ...(rawData.profilePicture ? { profilePicture: rawData.profilePicture } : {}),
});

/**
 * Fetching user data found by given parameters
 * @param {Object} params
 * @returns user fitting given conditions in params
 */
const retrieveOne = async (params) =>
  await Users.findOne({
    where: params,
  }).catch((error) => {
    console.log(error);
    throw new Error('No such user');
  });

/**
 * Fetching user data with additional info about posts and comments
 * @param {Number} id
 * @returns user with data
 */
const retrieveOneWithInfo = async (id) => {
  let result = await Users.findOne({
    where: { id },
    attributes: [
      'id',
      'login',
      'profilePicture',
      'fullName',
      'email',
      'role',
      'views',
      'rating',
      'createdAt',
      [sequelize.literal('COUNT(DISTINCT(posts.id))'), 'postsCount'],
      [sequelize.literal('COUNT(DISTINCT(comments.id))'), 'commentsCount'],
      [sequelize.literal('COUNT(DISTINCT(category_title))'), 'categoriesCount'],
    ],
    include: [
      {
        required: false,
        model: Posts,
        attributes: [],
        include: {
          attributes: [],
          required: false,
          model: Categories,
        },
      },
      {
        attributes: [],
        required: false,
        model: Comments,
      },
    ],
    group: ['users.id'],
  }).catch((error) => {
    console.log(error);
    throw new Error('An error occurred during user retrieval');
  });

  if (!result || result.length === 0) {
    throw new Error(`No user with this id: ${id}`);
  }
  result = dbResponse(
    result,
    'id',
    'login',
    'rating',
    'email',
    'views',
    'role',
    'fullName',
    'profilePicture',
    'createdAt',
    'postsCount',
    'categoriesCount',
    'commentsCount',
  );
  return result;
};

/**
 * Fetching all users from database
 * @param {Function} callback
 * @returns all currently known users
 */
const retrieveAll = async ({ sort, page }, callback) => {
  const rawUsers = await Users.findAll({
    subQuery: false,
    attributes: [
      'id',
      'login',
      'profilePicture',
      'rating',
      'views',
      'createdAt',
      'fullName',
      'email',
      [sequelize.literal('COUNT(DISTINCT(posts.id))'), 'postsCount'],
      [
        sequelize.literal('COUNT(DISTINCT(category_title))'),
        'categoriesCount',
      ],
    ],
    include: [
      {
        required: false,
        model: Posts,
        attributes: [],
        include: {
          attributes: [],
          required: false,
          model: Categories,
        },
      },
    ],
    group: ['users.id'],
    order: [[sequelize.col('postsCount'), 'DESC']],
  }).catch((error) => {
    console.log(error);
    return callback(responseHandler(false, 500, 'Server error!', null), null);
  });

  const result = rawUsers.map((user) =>
    dbResponse(
      user,
      'id',
      'login',
      'profilePicture',
      'email',
      'fullName',
      'rating',
      'views',
      'createdAt',
      'postsCount',
      'categoriesCount',
    ),
  );
  if (result?.length === 0) {
    return callback(responseHandler(false, 404, 'No users found', null), null);
  }

  return callback(
    responseHandler(true, 200, 'Successfully retrieved all users', result),
  );
};

/**
 * Adding given user to database
 * @param {Object} user
 */
const create = async (user) =>
  await Users.create(user).catch((error) => {
    console.log(error);
    throw new Error('Error occurred during registration!');
  });

/**
 * Updating email verification status in database
 * @param {String} email
 * @param {String} login
 */
const verifyEmail = async (email, login) => {
  await Users.update(
    {
      isEmailVerified: true,
    },
    {
      where: { email, login },
    },
  ).catch((error) => {
    console.log(error);
    throw new Error('No user with given login');
  });
};

/**
 * updating given user avatar
 * @param {String} id
 * @param {String} avatar
 */
const updateAvatar = async (id, avatar) => {
  const data = await Users.update(
    {
      profilePicture: avatar,
    },
    {
      where: { id },
    },
  ).catch((error) => {
    console.log(error);
    throw new Error(error);
  });
  return data;
};

/**
 * Updating given user password
 * @param {String} login
 * @param {String} newPassword
 */
const updatePassword = async (login, newPassword) => {
  await Users.update(
    {
      password: newPassword,
    },
    {
      where: { login },
    },
  ).catch((error) => {
    console.log(error);
    throw new Error('No user with given login');
  });
};

/**
 * Adding views to given user
 * @param {String} id
 */
const addViewsId = async (id) => {
  await Users.increment('views', {
    by: 1,
    where: { id },
  }).catch((error) => {
    console.log(error);
    throw new Error('No user with given id');
  });
};

/**
 * Adding rating to given user
 * @param {String} id
 */
const addRatingId = async (id) => {
  await Users.increment('rating', {
    by: 1,
    where: { id },
  }).catch((error) => {
    console.log(error);
    throw new Error('No user with given id');
  });
};

/**
 * Removing rating to given user
 * @param {String} id
 */
const removeRatingId = async (id) => {
  await Users.decrement('rating', {
    by: 1,
    where: { id },
  }).catch((error) => {
    if (error.parent.code === 'ER_DATA_OUT_OF_RANGE') {
    } else {
      console.log(error);
      throw new Error('No user with given id');
    }
  });
};

/**
 * Invalidating token of a given user
 * @param {String} id
 */
const updateTokenInvalidation = async (id) => {
  await Users.update(
    {
      tokenInvalidationDate: new Date().toISOString(),
    },
    {
      where: { id },
    },
  ).catch((error) => {
    console.log(error);
    throw new Error('No user with given id');
  });
};

/**
 * Deleting user fitting given parameters
 * @param {Object} params
 */
const removeUser = async (params) => {
  await Users.destroy({
    where: params,
  }).catch((error) => {
    console.log(error);
    throw new Error('No user with such params');
  });
};

/**
 * Updating given user info
 * @param {String} id user
 * @param {Object} newData new user data
 */
const updateUser = async (id, newData) => {
  await Users.update(newData, {
    where: { id },
  }).catch((error) => {
    console.log(error);
    throw new Error(error);
  });
};

module.exports = {
  User,
  UserFull,
  create,
  verifyEmail,
  addViewsId,
  addRatingId,
  removeRatingId,
  removeUser,
  updatePassword,
  updateAvatar,
  updateUser,
  updateTokenInvalidation,
  retrieveAll,
  retrieveOne,
  retrieveOneWithInfo,
};
