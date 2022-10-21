import * as Types from './types';

const initialState = {
  commentLikes: [],
  postLikes: [],
  loading: true,
  error: false,
};

export default likes = (action, state = initialState) => {
  switch (action.type) {
    case Types.GET_COMMENT_LIKES:
      return {
        ...state,
        commentLikes: action.data,
        loading: false,
      };
    case Types.GET_POST_LIKES:
      return {
        ...state,
        postLikes: action.data,
        loading: false,
      };
    case Types.CREATE_COMMENT_LIKE:
      return {
        ...state,
        commentLikes: [action.data, ...state.commentLikes],
        loading: false,
      };
    case Types.CREATE_POST_LIKE:
      return {
        ...state,
        postLikes: [action.data, ...state.postLikes],
        loading: false,
      };
    case Types.DELETE_POST_LIKE:
      return {
        ...state,
        postLikes: state.postLikes.filter(
          (postLike) => postLike.id === action.data
        ),
        loading: false,
      };
    case Types.DELETE_COMMENT_LIKE:
      return {
        ...state,
        commentLikes: state.commentLikes.filter(
          (commentLike) => commentLike.id === action.data
        ),
        loading: false,
      };
    case Types.LIKES_ERROR:
      return {
        ...state,
        error: action.data,
        loading: false,
      };
    default:
      return state;
  }
};
