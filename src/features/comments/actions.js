import * as Comments from '../../api/comments';
import * as Likes from '../../api/likes';
import {
  commentsPending,
  commentsError,
  getComments as _getComments,
  createComment as _createComment,
  updateComment as _updateComment,
  deleteComment as _deleteComment,
  getComment as _getComment,
  addLike as _addLike,
  getLikes as _getLikes,
  removeLike as _removeLike,
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

export const getLikes = (id) => {
  return async (dispatch) => {
    dispatch(commentsPending());
    try {
      const response = await Likes.getCommentLikes(id);
      dispatch(_getLikes(response.data.data));
    } catch (error) {
      dispatch(commentsError(error.response.data));
    }
  };
};

export const addLike = (id, type) => {
  return async (dispatch) => {
    dispatch(commentsPending());
    try {
      const response = await Likes.createCommentLike(id, type);
      dispatch(_addLike(response.data.data));
      dispatch(getLikes(response.data.data.commentId));
    } catch (error) {
      dispatch(commentsError(error.response.data));
    }
  };
};

export const removeLike = (id) => {
  return async (dispatch) => {
    dispatch(commentsPending());
    try {
      const response = await Likes.deleteCommentLike(id);
      dispatch(_removeLike(response.data.data));
      dispatch(getLikes(response.data.data.commentId));
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
