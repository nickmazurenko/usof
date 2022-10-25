import * as Comments from '../../api/comments';
import {
  commentsPending,
  commentsError,
  getComments as _getComments,
  createComment as _createComment,
  updateComment as _updateComment,
  deleteComment as _deleteComment,
  getComment as _getComment,
} from './reducer';

export const getComments = (id) => {
  return async (dispatch) => {
    dispatch(commentsPending());
    try {
      const response = await Comments.getPostComments(id);
      dispatch(_getComments(response.data.data));
    } catch (error) {
      dispatch(commentsError(error.response.data));
    }
  };
};

export const getComment = (id) => {
  return async (dispatch) => {
    dispatch(commentsPending());
    try {
      const response = await Comments.getIdComment(id);
      dispatch(_getComment(response.data.data));
    } catch (error) {
      dispatch(commentsError(error.response.data));
    }
  };
};

export const createComment = (id, comment) => {
  return async (dispatch) => {
    dispatch(commentsPending());
    try {
      const response = await Comments.createComment(id, comment);
      dispatch(_createComment(response.data.data));
      console.log(response.data.data);
      dispatch(getComment(response.data.data));
    } catch (error) {
      dispatch(commentsError(error.response.data));
    }
  };
};

export const updateComment = (comment) => {
  return async (dispatch) => {
    dispatch(commentsPending());
    try {
      const response = await Comments.updateComment(comment);
      dispatch(_updateComment(response.data.data));
    } catch (error) {
      dispatch(commentsError(error.response.data));
    }
  };
};

export const deleteComment = (id) => {
  return async (dispatch) => {
    dispatch(commentsPending());
    try {
      const response = await Comments.deleteComment(id);
      dispatch(_deleteComment(response.data.data));
    } catch (error) {
      dispatch(commentsError(error.response.data));
    }
  };
};
