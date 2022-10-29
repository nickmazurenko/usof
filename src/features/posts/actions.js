import * as Posts from '../../api/posts';
import * as Likes from '../../api/likes';
import {
  postsPending,
  postsError,
  userPostsPending,
  categoryPostsPending,
  getPosts as _getPosts,
  getPost as _getPost,
  deletePost as _deletePost,
  createPost as _createPost,
  updatePost as _updatePost,
  getCategoryPosts as _getCategoryPosts,
  getUserPosts as _getUserPosts,
  addLike as _addLike,
  removeLike as _removeLike,
  getLikes as _getLikes,
} from './reducer';

export const getPosts = (page) => {
  return async (dispatch) => {
    dispatch(postsPending());
    try {
      const response = await Posts.getPosts(page);
      dispatch(_getPosts(response.data.data));
    } catch (error) {
      dispatch(postsError(error.response.data));
    }
  };
};

export const getUserPosts = (id) => {
  return async (dispatch) => {
    dispatch(userPostsPending());
    try {
      const response = await Posts.getPosts(id);
      dispatch(_getUserPosts(response.data.data));
    } catch (error) {
      dispatch(postsError(error.response.data));
    }
  };
};

export const getCategoryPosts = (id) => {
  return async (dispatch) => {
    dispatch(categoryPostsPending());
    try {
      const response = await Posts.getCategoryPosts(id);
      dispatch(_getCategoryPosts(response.data.data));
    } catch (error) {
      dispatch(postsError(error.response.data));
    }
  };
};

export const getPost = (id) => {
  return async (dispatch) => {
    dispatch(postsPending());
    try {
      const response = await Posts.getIdPost(id);
      dispatch(_getPost(response.data.data));
    } catch (error) {
      dispatch(postsError(error.response.data));
    }
  };
};

export const createPost = (data) => {
  return async (dispatch) => {
    dispatch(postsPending());
    try {
      const response = await Posts.createPost(data);
      dispatch(_createPost(response.data.data));
    } catch (error) {
      dispatch(postsError(error.response.data));
    }
  };
};

export const updatePost = (data, id) => {
  return async (dispatch) => {
    dispatch(postsPending());
    try {
      const response = await Posts.updatePost(data, id);
      dispatch(_updatePost(response.data.data));
    } catch (error) {
      dispatch(postsError(error.response.data));
    }
  };
};

export const deletePost = (id) => {
  return async (dispatch) => {
    dispatch(postsPending());
    try {
      await Posts.deletePost(id);
      dispatch(_deletePost(id));
    } catch (error) {
      dispatch(postsError(error.response.data));
    }
  };
};

export const getLikes = (id) => {
  return async (dispatch) => {
    dispatch(postsPending());
    try {
      const response = await Likes.getPostLikes(id);
      dispatch(_getLikes(response.data.data));
    } catch (error) {
      dispatch(postsError(error.response.data));
    }
  };
};

export const addLike = (id, type) => {
  return async (dispatch) => {
    dispatch(postsPending());
    try {
      const response = await Likes.createPostLike(id, type);
      dispatch(_addLike(response.data.data));
      dispatch(getLikes(response.data.data.postId));
    } catch (error) {
      dispatch(postsError(error.response.data));
    }
  };
};

export const removeLike = (id) => {
  return async (dispatch) => {
    dispatch(postsPending());
    try {
      const response = await Likes.deletePostLike(id);
      dispatch(_removeLike(response.data.data));
      dispatch(getLikes(response.data.data.postId));
    } catch (error) {
      dispatch(postsError(error.response.data));
    }
  };
};
