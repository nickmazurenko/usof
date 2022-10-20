import * as Types from './types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default posts = (action, state = initialState) => {
  switch (action.type) {
    case Types.GET_POSTS:
    case Types.GET_CATEGORY_POSTS:
      return {
        ...state,
        posts: action.data,
        loading: false,
      };
    case Types.GET_POST:
      return {
        ...state,
        post: action.data,
        loading: false,
      };
    case Types.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.data),
      };
    case Types.CREATE_POST:
      return {
        ...state,
        posts: [action.data, ...state.posts],
      };
    case Types.UPDATE_POST:
      state.posts[
        state.posts
          .map((x, i) => [i, x])
          .filter((x) => x[1].id === action.data.id)[0][0]
      ] = action.data;
      return {
        ...state,
        posts,
        loading: false,
      };
    case Types.POST_ERROR:
      return {
        ...state,
        error: action.data,
        loading: false,
      };
    default:
      return state;
  }
};
