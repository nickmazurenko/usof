import { setAlert } from '../alert/actions';
import * as Types from './types';
import * as Posts from '../../api/posts';

export const getPosts = (params) => async (dispatch) => {
  try {
    const response = await Posts.getPosts(params);
    dispatch({
      type: Types.GET_POSTS,
      data: response.data.data,
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger'));
    dispatch({
      type: Types.POST_ERROR,
      data: { message: error.response.message, status: error.response.status },
    });
  }
};

export const getCategoryPosts = (id) => async (dispatch) => {
  try {
    const response = await Posts.getCategoryPosts(id);
    dispatch({
      type: Types.GET_CATEGORY_POSTS,
      data: response.data.data,
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger'));
    dispatch({
      type: Types.POST_ERROR,
      data: { message: error.response.message, status: error.response.status },
    });
  }
};

export const getPost = (id) => async (dispatch) => {
  try {
    const response = await Posts.getIdPost(id);
    dispatch({
      type: Types.GET_POST,
      data: response.data.data,
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger'));
    dispatch({
      type: Types.POST_ERROR,
      data: {
        message: error.response.message,
        status: error.response.status,
      },
    });
  }
};

export const createPost = (data) => async (dispatch) => {
  try {
    const response = await Posts.createPost(data);
    dispatch(setAlert(response.data.message, 'success'));
    dispatch(getPosts());
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger'));
    dispatch({
      type: Types.POST_ERROR,
      data: {
        message: error.response.data.message,
        status: error.response.status,
      },
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    const response = await Posts.deletePost(id);
    dispatch({
      type: Types.DELETE_POST,
      data: id,
    });
    dispatch(setAlert(response.data.message, 'success'));
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger'));
    dispatch({
      type: Types.POST_ERROR,
      data: {
        message: error.response.data.message,
        status: error.response.status,
      },
    });
  }
};

export const updatePost = (data, id) => async (dispatch) => {
  try {
    const response = await Posts.updatePost(data, id);
    dispatch({
      type: Types.UPDATE_POST,
      data: id,
    });
    dispatch(setAlert(response.data.message, 'success'));
  } catch (error) {
    dispatch(setAlert(error.response.data.message, 'danger'));
    dispatch({
      type: Types.POST_ERROR,
      data: {
        message: error.response.data.message,
        status: error.response.status,
      },
    });
  }
};
