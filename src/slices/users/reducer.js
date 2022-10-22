import { createSlice } from '@reduxjs/toolkit';
import * as Actions from './actions';

const initialState = {
  users: [],
  user: null,
  loading: true,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: {
    [Actions.getUsers.fulfilled]: (state, action) => {
      state.users = action.data;
      state.loading = false;
    },
    [Actions.getUser.fulfilled]: (state, action) => {
      state.user = action.data;
      state.loading = false;
    },
    [Actions.createUser.fulfilled]: (state, action) => {
      state.users.push(action.data);
      state.loading = false;
    },
    [Actions.updateUser.fulfilled]: (state, action) => {
      state.users[
        state.users.findIndex((user) => {
          return user.id === action.data.id;
        })
      ] = action.data;
      if (state.user.id === action.data.id) {
        state.user = action.data;
      }
      state.loading = false;
    },
    [Actions.updateAvatar.fulfilled]: (state, action) => {
      state.user.profilePicture = action.data.profilePicture;
      state.loading = false;
    },
    [Actions.deleteUser.fulfilled]: (state, action) => {
      state.users.filter((user) => {
        return user.id !== action.data.id;
      });
      state.loading = false;
    },
  },
});

export default usersSlice.reducer;
