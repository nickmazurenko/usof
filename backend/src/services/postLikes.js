const { responseHandler } = require('../helpers/handlers');
const likesModel = require('../models/likes');
const postsModel = require('../models/posts');
const usersModel = require('../models/users');

const getPostLikes = async (id, callback) => {
  const votes = await likesModel.getPostLikes(id, callback);
  const likes = votes.filter((vote) => vote.type === 'like');
  const likesCount = likes.length;
  const dislikes = votes.filter((vote) => vote.type === 'dislike');
  const dislikesCount = dislikes.length;

  const result = {
    postId: id,
    likesCount,
    dislikesCount,
    likes,
    dislikes,
  };

  return callback(
    null,
    responseHandler(true, 200, 'Likes retrieval successful', result),
  );
};

const create = async (like, callback) => {
  const { type, ...params } = like;
  const post = await postsModel.retrieveOne(like.post_id);
  const dbLike = await likesModel.retrieveOne(params);
  if ((!dbLike || dbLike?.type !== type) && post.userId !== like.user_id) {
    if (type === 'like') {
      await usersModel.addRatingId(post.userId);
    } else {
      await usersModel.removeRatingId(post.userId);
    }
  }
  await likesModel.create(like, callback);
};
const remove = async (params, callback) => {
  const post = await postsModel.retrieveOne(params.postId);
  const like = await likesModel.retrieveOne(params);
  if (post.userId !== params.userId) {
    if (like.type === 'like') {
      await usersModel.removeRatingId(post.userId);
    } else {
      await usersModel.addRatingId(post.userId);
    }
  }

  await likesModel.remove(params, callback);
};
module.exports = {
  getPostLikes,
  create,
  remove,
};
