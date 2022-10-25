import * as Posts from '../../api/posts';
import {
  postsPending,
  postsError,
  getPosts as _getPosts,
  getPost as _getPost,
  deletePost as _deletePost,
  createPost as _createPost,
  updatePost as _updatePost,
  getCategoryPosts as _getCategoryPosts,
  getUserPosts as _getUserPosts,
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
    dispatch(postsPending());
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
    dispatch(postsPending());
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

export const updatePost = (data) => {
  return async (dispatch) => {
    dispatch(postsPending());
    try {
      const response = await Posts.updatePost(data);
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
      const response = await Posts.deletePost(id);
      dispatch(_deletePost(id));
    } catch (error) {
      dispatch(postsError(error.response.data));
    }
  };
};
