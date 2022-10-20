import * as Types from './types';

const initialState = {
  categories: [],
  category: null,
  postCategories: [],
  loading: false,
  redirect: false,
  error: {},
};

export default tags = (action, state = initialState) => {
  switch (action.type) {
    case Types.GET_CATEGORIES:
      return {
        ...state,
        categories: action.data,
        loading: false,
        redirect: false,
      };
    case Types.GET_POST_CATEGORIES:
      return {
        ...state,
        postCategories: action.data,
        loading: false,
        redirect: false,
      };
    case Types.GET_CATEGORY:
      return {
        ...state,
        category: action.data,
        loading: false,
        redirect: false,
      };
    case Types.CREATE_CATEGORY:
      return {
        ...state,
        categories: [action.data, ...state.categories],
        loading: false,
        redirect: false,
      };
    case Types.DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== action.data
        ),
        loading: false,
        redirect: false,
      };
    case Types.UPDATE_CATEGORY:
      state.categories[
        state.categories
          .map((x, i) => [i, x])
          .filter((x) => x[1].id === action.data.id)[0][0]
      ] = action.data;
      state.postCategories[
        state.postCategories
          .map((x, i) => [i, x])
          .filter((x) => x[1].id === action.data.id)[0][0]
      ] = action.data;
      return {
        ...state,
        loading: false,
      };
    case Types.CATEGORIES_ERROR:
      return {
        ...state,
        error: action.data,
        loading: false,
        redirect: false,
      };
    default:
      return state;
  }
};
