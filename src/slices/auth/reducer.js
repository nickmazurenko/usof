import { createSlice } from '@reduxjs/toolkit';
import * as Actions from './actions';

const initialState = {
  loading: false,
  token: localStorage.getItem('token'),
  user: {},
  isAuthenticated: null,
  error: null,
};

const usersSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    // Registration
    [Actions.register.pending]: (state, { data }) => {
      state.loading = true;
      state.error = null;
    },
    [Actions.register.fulfilled]: (state, { data }) => {
      state.user = data;
      state.loading = false;
    },
    [Actions.register.rejected]: (state, { data }) => {
      state.loading = false;
      state.error = data;
    },
    // Login
    [Actions.login.pending]: (state, { data }) => {
      state.loading = true;
      state.error = null;
    },
    [Actions.login.fulfilled]: (state, { data }) => {
      state.loading = false;
      state.isAuthenticated = true;
    },
    [Actions.login.rejected]: (state, { data }) => {
      state.loading = false;
      state.error = data;
    },
    // loading Current User
    [Actions.loadCurrentUser.pending]: (state, { data }) => {
      state.loading = true;
      state.error = null;
    },
    [Actions.loadCurrentUser.fulfilled]: (state, { data }) => {
      state.loading = false;
      state.user = data;
    },
    [Actions.loadCurrentUser.rejected]: (state, { data }) => {
      state.loading = false;
      state.error = data;
    },
    // Logout
    [Actions.logout.pending]: (state, { data }) => {
      state.loading = true;
      state.error = null;
    },
    [Actions.logout.fulfilled]: (state, { data }) => {
      state.loading = false;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    [Actions.logout.rejected]: (state, { data }) => {
      state.loading = false;
      state.error = data;
    },
    // Request password reset
    [Actions.resetPassword.pending]: (state, { data }) => {
      state.loading = true;
      state.error = null;
    },
    [Actions.resetPassword.fulfilled]: (state, { data }) => {
      state.loading = false;
    },
    [Actions.resetPassword.rejected]: (state, { data }) => {
      state.loading = false;
      state.error = data;
    },
    // Reset password with token
    [Actions.resetPasswordToken.pending]: (state, { data }) => {
      state.loading = true;
      state.error = null;
    },
    [Actions.resetPasswordToken.fulfilled]: (state, { data }) => {
      state.loading = false;
    },
    [Actions.resetPasswordToken.rejected]: (state, { data }) => {
      state.loading = false;
      state.error = data;
    },
    // Request email confirmation
    [Actions.confirmEmail.pending]: (state, { data }) => {
      state.loading = true;
      state.error = null;
    },
    [Actions.confirmEmail.fulfilled]: (state, { data }) => {
      state.loading = false;
    },
    [Actions.confirmEmail.rejected]: (state, { data }) => {
      state.loading = false;
      state.error = data;
    },
  },
});

export default usersSlice.reducer;
