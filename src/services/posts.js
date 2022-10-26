const handlers = require('../helpers/handlers');
const { dbResponse } = require('../helpers/db');
const db = require('../config/db.config');
const { getCategoriesDescription } = require('../helpers/utils.categories');
const categoriesModel = require('../models/categories');
const postCategoriesModel = require('../models/postCategories');
const postsModel = require('../models/posts');
const likesModel = require('../models/likes');
const commentsModel = require('../models/comments');

const retrieveAll = async (params, callback) => {
  const posts = await postsModel.retrieveAll(params);
  const postsRawInfo = await postsModel.countAll();
  const postsInfo = await Promise.all(
    postsRawInfo.map(async (post) => {
      let likesCount = 0;
      let dislikesCount = 0;
      let likes;
      let dislikes;
      const votes = await likesModel.getPostLikes(post.id, (error) => {
        if (error) console.log(error);
      });
      if (votes) {
        likes = votes.filter((vote) => vote.type === 'like');
        likesCount = likes.length;
        dislikes = votes.filter((vote) => vote.type === 'dislike');
        dislikesCount = dislikes.length;
      }

      return {
        ...dbResponse(post, 'id', 'commentsCount'),
        likesCount,
        dislikesCount,
      };
    }),
  );
  const postsWithInfo = posts.map((post) => ({
    ...post,
    ...postsInfo.find((info) => info && info.id === post.id),
  }));
  return callback(
    null,
    handlers.responseHandler(
      true,
      200,
      'All posts successfully retrieved',
      postsWithInfo,
    ),
  );
};

const retrieveOne = async (id, callback) => {
  let hasLikes = true;
  let likesCount = 0;
  let dislikesCount = 0;
  let likes;
  let dislikes;
  await postsModel.addViewsId(id);
  const post = await postsModel.retrieveOne(id);
  const comments = await postsModel.countComments(id);
  const votes = await likesModel.getPostLikes(id, (error) => {
    if (error) hasLikes = false;
  });
  if (votes) {
    likes = votes.filter((vote) => vote.type === 'like');
    likesCount = likes.length;
    dislikes = votes.filter((vote) => vote.type === 'dislike');
    dislikesCount = dislikes.length;
  }
  const postWithInfo = {
    ...post,
    commentsCount: comments,
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
      'Post successfully retrieved',
      postWithInfo,
    ),
  );
};

const create = async (post, callback) => {
  let transaction;
  try {
    transaction = await db.transaction();
    const categories = post.categories
      .split(',')
      .map((category) => category.trim());
    if (categories.length < 2) {
      return callback(
        handlers.responseHandler(
          false,
          400,
          'There should be at least two categories',
          null,
        ),
        null,
      );
    }

    const dbPost = await postsModel.create(post, callback);
    const allCategories = [];
    const newCategoriesRaw = [];
    for (const category of categories) {
      const dbCategory = await categoriesModel.retrieveOne({
        categoryTitle: category,
      });
      if (dbCategory !== null) {
        allCategories.push({
          post_id: dbPost.id,
          category_id: dbCategory.id,
        });
      } else {
        newCategoriesRaw.push(category);
      }
    }

    const newCategoriesStr = newCategoriesRaw.join(';');
    let categoriesDescription;
    if (newCategoriesStr.length) {
      categoriesDescription = await getCategoriesDescription(newCategoriesStr);
    }
    const newCategories = [];
    for (const title of newCategoriesRaw) {
      const found =
        categoriesDescription.length &&
        categoriesDescription.find(
          (item) => item.tag_name === title.toLowerCase(),
        );
      const object = {
        categoryTitle: title,
        description: '',
      };
      if (!found) {
        object.description = `${title} is a general category`;
      } else {
        object.description = found.excerpt;
      }
      newCategories.push(object);
    }

    const dbNewCategories = await categoriesModel.createMultiple(newCategories);
    for (const category of dbNewCategories) {
      allCategories.push({
        post_id: dbPost.id,
        category_id: category.id,
      });
    }

    await postCategoriesModel.createMultiple(allCategories);
    const responsePost = await retrieveOne(dbPost.id, callback);
    callback(
      null,
      handlers.responseHandler(
        true,
        200,
        'Post creation successful',
        responsePost,
      ),
    );
    await transaction.commit();
  } catch (error) {
    console.log(error);
    callback(
      handlers.responseHandler(
        false,
        500,
        'An error occurred during post creation',
        null,
      ),
      null,
    );
    if (transaction) {
      transaction.rollback();
    }
  }
};

const update = async ({ postId, post }, callback) => {
  let transaction;
  try {
    transaction = await db.transaction();
    let dbPost;
    if (post.categories) {
      await postCategoriesModel.remove(postId);
      const categories = post.categories
        .split(',')
        .map((category) => category.trim());
      if (categories.length < 2) {
        return callback(
          handlers.responseHandler(
            false,
            400,
            'There should be at least two categories',
            null,
          ),
          null,
        );
      }

      dbPost = await postsModel.update(postId, post, callback);

      const allCategories = [];
      const newCategoriesRaw = [];
      for (const category of categories) {
        const dbCategory = await categoriesModel.retrieveOne({
          categoryTitle: category,
        });
        if (dbCategory !== null) {
          allCategories.push({
            post_id: postId,
            category_id: dbCategory.id,
          });
        } else {
          newCategoriesRaw.push(category);
        }
      }

      const newCategoriesStr = newCategoriesRaw.join(';');
      let categoriesDescription;
      if (newCategoriesStr.length) {
        categoriesDescription = await getCategoriesDescription(
          newCategoriesStr,
        );
      }
      const newCategories = [];
      for (const title of newCategoriesRaw) {
        const found =
          categoriesDescription.length &&
          categoriesDescription.find(
            (item) => item.tag_name === title.toLowerCase(),
          );
        const object = {
          categoryTitle: title,
          description: '',
        };
        if (!found) {
          object.description = `${title} is a general category`;
        } else {
          object.description = found.excerpt;
        }
        newCategories.push(object);
      }

      const dbNewCategories = await categoriesModel.createMultiple(
        newCategories,
      );
      for (const category of dbNewCategories) {
        allCategories.push({
          post_id: postId,
          category_id: category.id,
        });
      }

      await postCategoriesModel.createMultiple(allCategories);
    } else {
      dbPost = await postsModel.update(postId, post, callback);
    }
    const responsePost = await retrieveOne(dbPost.id);
    callback(
      null,
      handlers.responseHandler(
        true,
        200,
        'Post update successful',
        responsePost,
      ),
    );
    await transaction.commit();
  } catch (error) {
    console.log(error);
    callback(
      handlers.responseHandler(
        false,
        500,
        'An error occurred during post update',
        null,
      ),
      null,
    );
    if (transaction) {
      transaction.rollback();
    }
  }
};

const remove = async (id, callback) => {
  try {
    await commentsModel.removePostComments(id);
    await postCategoriesModel.remove(id);
    await likesModel.removePostLikes(id);
    await postsModel.remove(id);

    return callback(
      null,
      handlers.responseHandler(true, 200, 'Post removal successful', id),
    );
  } catch (error) {
    console.log(error);
    return callback(
      handlers.responseHandler(
        false,
        500,
        'An error occurred during post removal',
        null,
      ),
      null,
    );
  }
};

module.exports = {
  retrieveOne,
  retrieveAll,
  remove,
  create,
  update,
};
