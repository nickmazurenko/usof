import { createAsyncThunk } from '@reduxjs/toolkit';
import * as Users from '../../api/users';

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (page, { rejectWithValue }) => {
    console.log('there');
    try {
      const { data } = await Users.usersData(page);
      return data.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const getUser = createAsyncThunk('users/retrieveOne', async (id) => {
  const response = await Users.userIdData(id);
  return response.data.data;
});

export const createUser = createAsyncThunk('users/create', async (user) => {
  const response = await Users.createUser(user);
  return response.data.data;
});

export const updateUser = createAsyncThunk('users/update', async (user) => {
  const response = await Users.updateUser(user);
  return response.data.data;
});

export const updateAvatar = createAsyncThunk(
  'users/updateAvatar',
  async (avatar) => {
    const response = await Users.updateAvatar(avatar);
    return response.data.data;
  }
);

export const deleteUser = createAsyncThunk('users/delete', async (id) => {
  const response = await Users.deleteUser(id);
  return id;
});
