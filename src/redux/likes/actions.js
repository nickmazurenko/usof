import * as Types from './types';
import * as likesApi from '../../api/likes';

export const getPostLikes = (id) => async (dispatch) => {
  try {
    const response = await likesApi.getPostLikes(id);
    dispatch({
      type: Types.GET_POST_LIKES,
      data: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: Types.LIKES_ERROR,
      data: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getCommentLikes = (id) => async (dispatch) => {
  try {
    const response = await likesApi.getCommentLikes(id);
    dispatch({
      type: Types.GET_COMMENT_LIKES,
      data: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: Types.LIKES_ERROR,
      data: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const createPostLike = (id, data) => async (dispatch) => {
  try {
    const response = await likesApi.createPostLike(id, data);
    dispatch({
      type: Types.CREATE_POST_LIKE,
      data: response.data.data,
    });

    dispatch(createNotification(response.data.message, 'success'));
    dispatch(getPostLikes(id));
  } catch (error) {
    dispatch(createNotification(error.response.data.message, 'danger'));

    dispatch({
      type: Types.LIKES_ERROR,
      data: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const createCommentLike = (id, data) => async (dispatch) => {
  try {
    const response = await likesApi.createCommentLike(id, data);
    dispatch({
      type: Types.CREATE_COMMENT_LIKE,
      data: response.data.data,
    });

    dispatch(createNotification(response.data.message, 'success'));
    dispatch(getCommentLikes(id));
  } catch (error) {
    dispatch(createNotification(error.response.data.message, 'danger'));

    dispatch({
      type: Types.LIKES_ERROR,
      data: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deletePostLike = (id) => async (dispatch) => {
  try {
    const response = await likesApi.deletePostLike(id);

    dispatch({
      type: Types.DELETE_POST_LIKE,
      data: id,
    });

    dispatch(createNotification(response.data.message, 'success'));
  } catch (error) {
    dispatch(createNotification(error.response.data.message, 'danger'));
    dispatch({
      type: Types.LIKES_ERROR,
      data: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deleteCommentLike = (id) => async (dispatch) => {
  try {
    const response = await likesApi.deleteCommentLike(id);

    dispatch({
      type: Types.DELETE_COMMENT_LIKE,
      data: id,
    });

    dispatch(createNotification(response.data.message, 'success'));
  } catch (error) {
    dispatch(createNotification(error.response.data.message, 'danger'));
    dispatch({
      type: Types.LIKES_ERROR,
      data: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
