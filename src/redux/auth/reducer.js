import * as Types from './types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default auth = (action, state = initialState) => {
  switch (action.type) {
    case Types.USER_LOADED:
      return {
        ...state,
        user: action.data,
        isAuthenticated: true,
        loading: false,
      };
    case Types.REGISTER_SUCCESS:
    case Types.LOGIN_SUCCESS:
      localStorage.setItem('token', action.data.token);
      return {
        ...state,
        ...action.data,
        isAuthenticated: true,
        loading: false,
      };
    case Types.REGISTER_FAIL:
    case Types.LOGIN_FAIL:
    case Types.LOGOUT:
    case Types.AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case Types.EMAIL_SENT:
      return {
        ...state,
        loading: false,
      };
    case Types.PASSWORD_RESET:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};
