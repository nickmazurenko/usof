const sequelize = require('sequelize');
const { Likes, Users } = require('../tables');
const handlers = require('../helpers/handlers');

const getPostLikes = async (id, callback) => {
  const likes = await Likes.findAll({
    where: {
      post_id: id,
    },
    attributes: [
      'user_id',
      'post_id',
      'type',
      'createdAt',
      [sequelize.literal('user.login'), 'login'],
    ],
    include: {
      model: Users,
      attributes: [],
    },
  }).catch((error) => {
    console.log(error);
    return callback(
      handlers.responseHandler(
        false,
        500,
        'An error occurred during likes retrieval',
        null,
      ),
      null,
    );
  });

  if (likes.length === 0) {
    return callback(
      handlers.responseHandler(
        false,
        404,
        'No likes for post with this id',
        null,
      ),
      null,
    );
  }

  return likes;
};

const getCommentLikes = async (id, callback) => {
  const likes = await Likes.findAll({
    where: {
      comment_id: id,
    },
    attributes: [
      'user_id',
      'comment_id',
      'type',
      'createdAt',
      [sequelize.literal('user.login'), 'login'],
    ],
    include: {
      model: Users,
      attributes: [],
    },
  }).catch((error) => {
    console.log(error);
    return callback(
      handlers.responseHandler(
        false,
        500,
        'An error occurred during likes retrieval',
        null,
      ),
      null,
    );
  });

  if (likes.length === 0) {
    return callback(
      handlers.responseHandler(
        false,
        404,
        'No likes for comment with this id',
        null,
      ),
      null,
    );
  }

  return likes;
};

const create = async (like, callback) => {
  try {
    const { type, ...params } = like;
    const dbLike = await Likes.findOne({
      where: params,
    });

    if (dbLike) {
      await Likes.update(
        { type },
        {
          where: params,
        },
      );
      return callback(
        null,
        handlers.responseHandler(true, 200, 'Like type update successful', null),
      );
    }
    await Likes.create(like);
    return callback(
      null,
      handlers.responseHandler(true, 200, 'Like creation successful', null),
    );
  } catch (error) {
    console.log(error);
    return callback(
      handlers.responseHandler(
        false,
        500,
        'An error occurred during like creation',
        null,
      ),
      null,
    );
  }
};

const remove = async (params, callback) => {
  await Likes.destroy({ where: params }).catch((error) => {
    console.log(error);
    return callback(
      handlers.responseHandler(
        false,
        404,
        'An error occurred during like removal',
        null,
      ),
      null,
    );
  });

  return callback(
    null,
    handlers.responseHandler(true, 200, 'Like removal successful', null),
  );
};

const removePostLikes = async (post_id) => {
  await Likes.destroy({ where: { post_id } }).catch((error) => {
    console.log(error);
    throw new Error(error);
  });
};
const removeCommentLikes = async (comment_id) => {
  await Likes.destroy({ where: { comment_id } }).catch((error) => {
    console.log(error);
    throw new Error(error);
  });
};

const retrieveOne = async (params) => await Likes.findOne({ where: params }).catch((error) => {
  console.log(error);
  throw new Error(error);
});

module.exports = {
  getPostLikes,
  removePostLikes,
  removeCommentLikes,
  getCommentLikes,
  create,
  remove,
  retrieveOne,
};
