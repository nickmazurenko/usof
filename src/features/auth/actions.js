import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  register as _register,
  login as _login,
  logout as _logout,
  loadCurrentUser as _loadCurrentUser,
  confirmEmail as _confirmEmail,
  resetPassword as _resetPassword,
  resetPasswordToken as _resetPasswordToken,
  authError,
  authPending,
} from './reducer';
import * as Auth from '../../api/auth';

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const loadCurrentUser = () => {
  return async (dispatch) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    dispatch(authPending());
    try {
      const response = await Auth.loadCurrentUser();
      dispatch(_loadCurrentUser(response.data.data));
    } catch (error) {
      dispatch(authError(error));
    }
  };
};

export const login = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(authPending());
    try {
      const response = await Auth.loginUser(email, password);
      localStorage.setItem('x-auth-token', response.data.data.token);
      dispatch(_login(response.data.data.token));
      dispatch(loadCurrentUser());
    } catch (error) {
      dispatch(authError(response.data.message));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(authPending());
    try {
      const response = await Auth.logoutUser();
      localStorage.removeItem('x-auth-token');
      delete axios.defaults.headers.common['x-auth-token'];
      dispatch(_logout(response.data.data));
    } catch (error) {
      dispatch(authError(response.data.message));
    }
  };
};

export const register = (user) => {
  return async (dispatch) => {
    dispatch(authPending());
    try {
      const response = await Auth.registerUser(user);
      loadCurrentUser();
      dispatch(_register(response.data.data));
    } catch (error) {
      dispatch(authError(response.data.message));
    }
  };
};

export const confirmEmail = (email) => {
  return async (dispatch) => {
    dispatch(authPending());
    try {
      const response = await Auth.confirmUserEmail(email);
      dispatch(_confirmEmail(response.data.data));
    } catch (error) {
      dispatch(authError(response.data.message));
    }
  };
};

export const resetPassword = (email) => {
  return async (dispatch) => {
    dispatch(authPending());
    try {
      const response = await Auth.resetUserPassword(email);
      dispatch(_resetPassword(response.data.data));
    } catch (error) {
      dispatch(authError(response.data.message));
    }
  };
};

export const resetPasswordToken = ({ newPassword }) => {
  return async (dispatch) => {
    dispatch(authPending());
    try {
      const response = await Auth.resetUserPasswordToken(newPassword);
      dispatch(_resetPasswordToken(response.data.data));
    } catch (error) {
      dispatch(authError(response.data.message));
    }
  };
};
