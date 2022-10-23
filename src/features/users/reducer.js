import { createSlice } from '@reduxjs/toolkit';
// import * as Actions from './actions';

const initialState = {
  data: null,
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
      state.data = null;
    },
    getUsers: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.data = payload;
    },
    getUser: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.user = payload;
    },
    createUser: (state, { payload }) => {
      state.data.users = [payload, ...state.data.users];
      state.loading = false;
      state.error = null;
    },
    updateUser: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.data.users[
        state.data.users.findIndex((user) => {
          return user.id === payload.id;
        })
      ] = payload;
      state.loading = false;
      state.error = null;
    },
    updateAvatar: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.data.users[
        state.data.users.findIndex((user) => {
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
      state.data.users.filter((user) => {
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
