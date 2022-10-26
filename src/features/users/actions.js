import { createAsyncThunk } from '@reduxjs/toolkit';
import * as Users from '../../api/users';
import {
  usersPending as _usersPending,
  usersError as _usersError,
  getUsers as _getUsers,
  getUser as _getUser,
  deleteUser as _deleteUser,
  createUser as _createUser,
  updateAvatar as _updateAvatar,
  updateUser as _updateUser,
} from './reducer';

export const getUsers = (page) => {
  return async (dispatch) => {
    dispatch(_usersPending());
    try {
      const response = await Users.usersData(page);
      dispatch(_getUsers(response.data.data));
    } catch (error) {
      dispatch(_usersError(error.response.data));
    }
  };
};

export const getUser = (id) => {
  return async (dispatch) => {
    dispatch(_usersPending());
    try {
      const response = await Users.userIdData(id);
      dispatch(_getUser(response.data.data));
    } catch (error) {
      dispatch(_usersError(error.response.data));
    }
  };
};

export const createUser = (data) => {
  return async (dispatch) => {
    dispatch(_usersPending());
    try {
      const response = await Users.createUser(data);
      dispatch(_createUser(response.data.data));
    } catch (error) {
      dispatch(_usersError(error.response.data));
    }
  };
};

export const updateUser = (data, id) => {
  return async (dispatch) => {
    dispatch(_usersPending());
    try {
      const response = await Users.updateUser(data, id);
      dispatch(_updateUser(response.data.data));
    } catch (error) {
      dispatch(_usersError(error.response.data));
    }
  };
};

export const updateAvatar = (avatar) => {
  return async (dispatch) => {
    dispatch(_usersPending());
    try {
      const response = await Users.updateAvatar(avatar);
      dispatch(_updateAvatar(response.data.data));
    } catch (error) {
      dispatch(_usersError(error.response.data));
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    dispatch(_usersPending());
    try {
      const response = await Users.deleteUser(id);
      dispatch(_deleteUser(id));
    } catch (error) {
      dispatch(_usersError(error.response.data));
    }
  };
};
