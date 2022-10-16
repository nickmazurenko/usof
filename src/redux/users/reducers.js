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
      state.users[
        state.users.findIndex((user) => user.id === action.data.id)
      ].profilePicture = action.data.profilePicture;
      return {
        ...state,
        users: state.users,
        loading: false,
      };
    case Types.PATCH_USER:
      state.users[state.users.findIndex((user) => user.id === action.data.id)] = action.data;
      return {
        ...state,
        users: state.users,
        loading: false,
      };
    case Types.DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.data),
        loading: false,
      };
    case Types.USERS_ERROR:
      return {
        ...state,
        error: action.data,
        loading: false,
      };
    default:
      return state;
  }
};
