import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import * as Auth from '../../api/auth';

export const setAuthToken = () => {
  // eslint-disable-next-line operator-linebreak
  axios.defaults.headers.common['x-auth-token'] =
    localStorage.getItem('x-auth-token');
};

export const loadCurrentUser = createAsyncThunk(
  'auth/loadCurrentUser',
  async () => {
    try {
      const response = await Auth.loadCurrentUser();
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await Auth.loginUser(email, password);
      localStorage.setItem('x-auth-token', response.data.data.token);
      setAuthToken();
      const { data } = await Auth.loadCurrentUser();
      return data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (params, { rejectWithValue }) => {
    try {
      setAuthToken();
      const response = await Auth.logoutUser();
      localStorage.removeItem('x-auth-token');
      delete axios.defaults.headers.common['x-auth-token'];
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (params, { rejectWithValue }) => {
    try {
      const response = await Auth.registerUser(params);
      setAuthToken();
      loadCurrentUser();
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const confirmEmail = createAsyncThunk(
  'auth/confirmEmail',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await Auth.confirmUserEmail(email);
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (email, { rejectWithValue }) => {
    try {
      const response = await Auth.resetUserPassword(email);
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const resetPasswordToken = createAsyncThunk(
  'auth/resetPasswordToken',
  async ({ newPassword }, { rejectWithValue }) => {
    try {
      const response = await Auth.resetUserPasswordToken(newPassword);
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);
