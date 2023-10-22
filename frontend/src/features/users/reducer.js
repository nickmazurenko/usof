import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

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
      toast.error(payload.message, {
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
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
      state.users = [payload, ...state.users];
      state.loading = false;
      state.error = null;
    },
    updateUser: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.users[
        state.users.findIndex((user) => {
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
        state.users.findIndex((user) => {
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
      state.users.filter((user) => {
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
