/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';

import * as Endpoints from './endpoints';

const headers = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getPostLikes = (id) => {
  return axios.get(Endpoints.getPostLikes.replace('{id}', id));
};

export const getCommentLikes = (id) => {
  return axios.get(Endpoints.getCommentLikes.replace('{id}', id));
};

export const createPostLike = (id, type) => {
  const body = JSON.stringify({ type });
  return axios.post(
    Endpoints.createPostLike.replace('{id}', id),
    body,
    headers
  );
};

export const createCommentLike = (id, type) => {
  const body = JSON.stringify({ type });
  return axios.post(
    Endpoints.createCommentLike.replace('{id}', id),
    body,
    headers
  );
};

export const deletePostLike = (id) => {
  return axios.delete(Endpoints.deletePostLike.replace('{id}', id));
};

export const deleteCommentLike = (id) => {
  return axios.delete(Endpoints.deleteCommentLike.replace('{id}', id));
};
