/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';
import * as Endpoints from './endpoints';

const headers = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const usersData = (page) => {
  return axios.get(Endpoints.users, { params: { page } });
};

export const userIdData = (id) => {
  return axios.get(Endpoints.userId.replace('{id}', id));
};

export const createUser = (data) => {
  const body = JSON.stringify(data);
  return axios.post(Endpoints.createUser, body, headers);
};

export const updateAvatar = (data) => {
  const fd = new FormData();
  fd.append('avatar', data);
  return axios.patch(Endpoints.updateAvatar, fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateUser = (data, id) => {
  const body = JSON.stringify(data);
  return axios.patch(Endpoints.updateUser.replace('{id}', id), body, headers);
};

export const deleteUser = (id) => {
  return axios.delete(Endpoints.deleteUser.replace('{id}', id));
};
