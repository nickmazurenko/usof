/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';
import Endpoints from './endpoints';

export const usersData = () => axios.get(Endpoints.users);

export const userIdData = (id) =>
  axios.get(Endpoints.userId.replace('{id}', id));

export const createUser = (data) => {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return axios.post(Endpoints.createUser, data, headers);
};

export const updateAvatar = (data) => {
  const headers = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return axios.patch(Endpoints.updateAvatar, data, headers);
};

export const updateUser = (data, id) => {
  const headers = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return axios.patch(Endpoints.updateUser.replace('{id}', id), data, headers);
};

export const deleteUser = (id) =>
  axios.delete(Endpoints.deleteUser.replace('{id}', id));
