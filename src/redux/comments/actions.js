import createNotification from '../notifications/actions';
import * as Types from './types';
import * as commentsApi from '../../api/comments';

export const getPostComments = (id) => async (dispatch) => {
  try {
    const response = await commentsApi.getPostComments(id);
    dispatch({
      type: Types.GET_POST_COMMENTS,
      data: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: Types.COMMENT_ERROR,
      data: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getIdComment = (id) => async (dispatch) => {
  try {
    const response = await commentsApi.getIdComment(id);
    dispatch({
      type: Types.GET_COMMENT,
      data: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: Types.COMMENT_ERROR,
      data: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const createComment = (id, data) => async (dispatch) => {
  try {
    const response = await commentsApi.createComment(id, data);
    dispatch({
      type: Types.CREATE_COMMENT,
      data: response.data.data,
    });

    dispatch(createNotification(response.data.message, 'success'));
    dispatch(getPostComments(id));
  } catch (error) {
    dispatch(createNotification(error.response.data.message, 'danger'));

    dispatch({
      type: Types.COMMENT_ERROR,
      data: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const updateComment = (id, data) => async (dispatch) => {
  try {
    const response = await commentsApi.updateComment(id, data);
    dispatch(createNotification(response.data.message, 'success'));
  } catch (error) {
    dispatch(createNotification(error.response.data.message, 'danger'));
    dispatch({
      type: Types.COMMENT_ERROR,
      data: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deleteComment = (id) => async (dispatch) => {
  try {
    const response = await commentsApi.deleteComment(id);

    dispatch({
      type: Types.DELETE_COMMENT,
      data: id,
    });

    dispatch(createNotification(response.data.message, 'success'));
  } catch (error) {
    dispatch(createNotification(error.response.data.message, 'danger'));
    dispatch({
      type: Types.COMMENT_ERROR,
      data: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
