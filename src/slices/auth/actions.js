import { createAsyncThunk } from '@reduxjs/toolkit';
import * as Auth from '../../api/auth';

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const loadCurrentUser = createAsyncThunk(
  'auth/loadCurrentUser',
  async () => {
    try {
      const response = await Auth.loadCurrentUser();
      return response.data;
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
      setAuthToken(response.data.data.token);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/login',
  async (params, { rejectWithValue }) => {
    try {
      const response = await Auth.logoutUser();
      return response.data;
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
      loadCurrentUser();
      return response.data;
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
      return response.data;
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
  async (params, { rejectWithValue }) => {
    try {
      const response = await Auth.resetUserPassword();
      return response.data;
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
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);
