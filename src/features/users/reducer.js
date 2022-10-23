import { createSlice } from '@reduxjs/toolkit';
import * as Actions from './actions';

const initialState = {
  data: null,
  usersStatus: 'empty',
  user: null,
  loading: true,
  error: null,
};

const usersSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    // Registration
    [Actions.getUsers.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = null;
    },
    [Actions.getUsers.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
      state.usersStatus = 'full';
    },
    [Actions.getUsers.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export default usersSlice.reducer;
