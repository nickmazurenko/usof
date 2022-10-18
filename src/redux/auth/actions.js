import axios from 'axios';
import * as Auth from '../../api/auth';
import * as Types from './types';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const loadCurrentUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const response = await Auth.loadCurrentUser();
    dispatch({
      type: Types.USER_LOADED,
      data: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: Types.AUTH_ERROR,
    });
  }
};

export const register = (params) => async (dispatch) => {
  try {
    const response = await Auth.registerUser(params);
    dispatch({
      type: Types.REGISTER_SUCCESS,
      data: response.data.data,
    });
    dispatch(loadCurrentUser());
  } catch (error) {
    dispatch({
      type: Types.REGISTER_FAIL,
    });
  }
};

export const login = () => async (dispatch) => {
  try {
    const response = await Auth.loginUser({ email, password });
    dispatch({
      type: Types.LOGIN_SUCCESS,
      data: response.data.data,
    });

    dispatch(setAlert(response.data.massage, 'success'));

    dispatch(loadCurrentUser());
  } catch (error) {
    dispatch({
      type: Types.LOGIN_FAIL,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    const response = await Auth.logoutUser();
    dispatch({
      type: Types.LOGOUT,
      data: response.data.data,
    });

    dispatch(setAlert(response.data.massage, 'success'));
  } catch (error) {
    dispatch({
      type: Types.AUTH_ERROR,
    });
  }
};

export const confirmEmail = () => async (dispatch) => {
  try {
    const response = await Auth.confirmUserEmail();
    dispatch({
      type: Types.EMAIL_SENT,
      data: response.data.data,
    });

    dispatch(setAlert(response.data.massage, 'success'));
  } catch (error) {
    dispatch({
      type: Types.AUTH_ERROR,
    });
  }
};

export const resetUserPassword = () => async (dispatch) => {
  try {
    const response = await Auth.resetUserPassword();
    dispatch({
      type: Types.EMAIL_SENT,
      data: response.data.data,
    });

    dispatch(setAlert(response.data.massage, 'success'));
  } catch (error) {
    dispatch({
      type: Types.AUTH_ERROR,
    });
  }
};

export const resetUserPasswordToken = (token) => async (dispatch) => {
  try {
    const response = await Auth.resetUserPasswordToken(token);
    dispatch({
      type: Types.PASSWORD_RESET,
      data: response.data.data,
    });

    dispatch(setAlert(response.data.massage, 'success'));
  } catch (error) {
    dispatch({
      type: Types.AUTH_ERROR,
    });
  }
};
