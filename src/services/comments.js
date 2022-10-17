const { responseHandler } = require('../helpers/handlers');
const commentsModel = require('../models/comments');
const likesModel = require('../models/likes');

const retrieveOne = async (id, callback) => {
  try {
    let hasLikes = true;
    let likesCount = 0;
    let dislikesCount = 0;
    let likes;
    let dislikes;
    const comment = await commentsModel.retrieveOne(id);
    const votes = await likesModel.getCommentLikes(id, (error) => {
      if (error) hasLikes = false;
    });
    if (votes) {
      likes = votes.filter((vote) => vote.type === 'like');
      likesCount = likes.length;
      dislikes = votes.filter((vote) => vote.type === 'dislike');
      dislikesCount = dislikes.length;
    }

    const commentWithInfo = {
      ...comment,
      likes,
      dislikes,
      likesCount,
      dislikesCount,
    };
    return callback(
      null,
      handlers.responseHandler(
        true,
        200,
        'Comment successfully retrieved',
        commentWithInfo,
      ),
    );
  } catch (error) {
    console.log(error);
    return callback(responseHandler(false, 404, error.message, null), null);
  }
};

const update = async ({ commentId, comment }, callback) => {
  try {
    const dbComment = await commentsModel.update(commentId, comment);

    callback(
      null,
      handlers.responseHandler(
        true,
        200,
        'Comment update successful',
        dbComment.id,
      ),
    );
  } catch (error) {
    console.log(error);
    callback(
      handlers.responseHandler(
        false,
        500,
        'An error occurred during comment update',
        null,
      ),
      null,
    );
  }
};

const remove = async (id, callback) => {
  try {
    await likesModel.removeCommentLikes(id);
    await commentsModel.remove(id);

    return callback(
      null,
      handlers.responseHandler(true, 200, 'Comment removal successful', null),
    );
  } catch (error) {
    console.log(error);
    return callback(
      handlers.responseHandler(
        false,
        500,
        'An error occurred during comment removal',
        null,
      ),
      null,
    );
  }
};

module.exports = {
  retrieveOne,
  remove,
  update,
};
