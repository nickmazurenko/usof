import { createSlice } from '@reduxjs/toolkit';
// import * as Actions from './actions';

const initialState = {
  users: [],
  user: null,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersPending: (state) => {
      state.loading = true;
    },
    usersError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.users = null;
    },
    getUsers: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.users = payload;
    },
    getUser: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.user = payload;
    },
    createUser: (state, { payload }) => {
      state.users.users = [payload, ...state.users.users];
      state.loading = false;
      state.error = null;
    },
    updateUser: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.users[
        state.users.users.findIndex((user) => {
          return user.id === payload.id;
        })
      ] = payload;
      state.loading = false;
      state.error = null;
    },
    updateAvatar: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.users[
        state.users.users.findIndex((user) => {
          return user.id === payload.id;
        })
      ].profilePicture = payload.profilePicture;
      if (state.user.id === payload.id) {
        state.user.profilePicture = payload.profilePicture;
      }
      state.loading = false;
      state.error = null;
    },
    deleteUser: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.users.users.filter((user) => {
        return user.id !== payload.id;
      });
    },
  },
});

export const {
  usersPending,
  usersError,
  getUsers,
  getUser,
  updateAvatar,
  updateUser,
  createUser,
  deleteUser,
} = usersSlice.actions;

export default usersSlice.reducer;
