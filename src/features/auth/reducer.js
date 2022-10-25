import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  resetPasswordLoading: true,
  token: localStorage.getItem('x-auth-token'),
  user: {},
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authPending: (state) => {
      state.loading = true;
    },
    resetPasswordPending: (state) => {
      state.resetPasswordLoading = true;
    },
    authError: (state, { payload }) => {
      state.loading = false;
      state.resetPasswordLoading = false;
      state.error = payload;
      state.isAuthenticated = false;
      state.user = null;
    },
    register: (state, { payload }) => {
      state.loading = false;
      state.error = null;
    },
    login: (state, { payload }) => {
      localStorage.setItem('token', payload);
      state.loading = false;
      state.error = null;
      state.user = payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.loading = false;
      state.error = null;
      state.user = null;
      state.isAuthenticated = false;
    },
    loadCurrentUser: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.user = payload;
    },
    confirmEmail: (state) => {
      state.loading = false;
      state.error = null;
    },
    resetPassword: (state) => {
      state.resetPasswordLoading = false;
      state.error = null;
    },
    resetPasswordToken: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  register,
  login,
  logout,
  authError,
  authPending,
  resetPassword,
  resetPasswordToken,
  resetPasswordPending,
  loadCurrentUser,
  confirmEmail,
} = authSlice.actions;

export default authSlice.reducer;
