import * as Types from './types';

const initialState = {
  users: [],
  user: null,
  loading: true,
  error: {},
};

export default users = (action, state = initialState) => {
  switch (action.type) {
    case Types.GET_USERS:
      return {
        ...state,
        users: action.data,
        loading: false,
      };
    case Types.GET_USER_ID:
      return {
        ...state,
        user: action.data,
        loading: false,
      };
    case Types.POST_USER:
      return {
        ...state,
        users: [action.data, ...state.users],
        loading: false,
      };
    case Types.PATCH_AVATAR:
      return {
        ...state,
        users: action.data,
        loading: false,
      };
    default:
      return state;
  }
};
