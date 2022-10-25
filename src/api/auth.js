/* eslint-disable comma-dangle */
import axios from 'axios';
import * as Endpoints from './endpoints';

const headers = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

export const loadCurrentUser = () => {
  return axios.get(Endpoints.currentUserData);
};

export const logoutUser = () => {
  return axios.post(Endpoints.logoutUser);
};

export const registerUser = (params) => {
  const body = JSON.stringify(params);

  return axios.post(Endpoints.registerUser, body, headers);
};

export const loginUser = (email, password) => {
  const body = JSON.stringify({ email, password });
  return axios.post(Endpoints.loginUser, body, headers);
};

export const resetUserPassword = (email) => {
  const body = JSON.stringify({ email });

  return axios.post(Endpoints.resetUserPassword, body, headers);
};

export const resetUserPasswordToken = (passwords, token) => {
  const body = JSON.stringify(passwords);
  return axios.post(
    Endpoints.resetUserPasswordToken.replace('{token}', token),
    body,
    headers
  );
};

export const confirmUserEmail = (email) => {
  const body = JSON.stringify({ email });
  return axios.post(Endpoints.confirmUserEmail, body, headers);
};
