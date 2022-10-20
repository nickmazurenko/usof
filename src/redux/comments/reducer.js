import * as Types from './types';

const initialState = {
  comments: [],
  comment: null,
  loading: true,
  error: false,
};

export default comments = (action, state = initialState) => {
  switch (action.type) {
    case Types.GET_POST_COMMENTS:
      return {
        ...state,
        comments: action.data,
        loading: false,
      };
    case Types.GET_COMMENT:
      return {
        ...state,
        comments: action.data,
        loading: false,
      };
    case Types.CREATE_COMMENT:
      return {
        ...state,
        comments: [action.data, state.comments],
        loading: false,
      };
    case Types.UPDATE_COMMENT:
      state.comments[
        state.comments
          .map((x, i) => [i, x])
          .filter((x) => x[1].id === action.data.id)[0][0]
      ] = action.data;
      return {
        ...state,
        comments: state.comments,
        loading: false,
      };
    case Types.DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment.id === action.data
        ),
        loading: false,
      };
    case Types.COMMENT_ERROR:
      return {
        ...state,
        error: action.data,
        loading: false,
      };
    default:
      return state;
  }
};
