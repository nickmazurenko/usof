import { createSlice } from '@reduxjs/toolkit';
import * as Actions from './actions';

const initialState = {
  loading: false,
  token: localStorage.getItem('x-auth-token'),
  user: {},
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    // Registration
    [Actions.register.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = null;
    },
    [Actions.register.fulfilled]: (state, { payload }) => {
      state.user = payload;
      state.loading = false;
    },
    [Actions.register.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // Login
    [Actions.login.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = null;
    },
    [Actions.login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.isAuthenticated = true;
    },
    [Actions.login.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // loading Current User
    [Actions.loadCurrentUser.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = null;
    },
    [Actions.loadCurrentUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    },
    [Actions.loadCurrentUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // Logout
    [Actions.logout.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = null;
    },
    [Actions.logout.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    [Actions.logout.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // Request password reset
    [Actions.resetPassword.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = null;
    },
    [Actions.resetPassword.fulfilled]: (state, { payload }) => {
      state.loading = false;
    },
    [Actions.resetPassword.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // Reset password with token
    [Actions.resetPasswordToken.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = null;
    },
    [Actions.resetPasswordToken.fulfilled]: (state, { payload }) => {
      state.loading = false;
    },
    [Actions.resetPasswordToken.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    // Request email confirmation
    [Actions.confirmEmail.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = null;
    },
    [Actions.confirmEmail.fulfilled]: (state, { payload }) => {
      state.loading = false;
    },
    [Actions.confirmEmail.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default authSlice.reducer;
