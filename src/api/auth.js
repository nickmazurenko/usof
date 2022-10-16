import axios from 'axios';
import * as Endpoints from './endpoints';

export const loadCurrentUser = () => axios.get(Endpoints.currentUserData);

export const registerUser = (login, password, email) => {
  const headers = {
    header: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

  const body = JSON.stringify({ login, password, email });

  return axios.post(Endpoints.registerUser, body, headers);
};
