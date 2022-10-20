/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';

import * as Endpoints from './endpoints';

const headers = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getPostLikes = (id) =>
  axios.get(Endpoints.getPostLikes.replace('{id}', id));

export const getCommentLikes = (id) =>
  axios.get(Endpoints.getCommentLikes.replace('{id}', id));

export const createPostLike = (id, data) => {
  const body = JSON.stringify(data);
  return axios.post(
    Endpoints.createPostLike.replace('{id}', id),
    body,
    headers
  );
};

export const createCommentLike = (id, data) => {
  const body = JSON.stringify(data);
  return axios.post(
    Endpoints.createCommentLike.replace('{id}', id),
    body,
    headers
  );
};

export const deletePostLike = (id) =>
  axios.delete(Endpoints.deletePostLike.replace('{id}', id));

export const deleteCommentLike = (id) =>
  axios.delete(Endpoints.deleteCommentLike.replace('{id}', id));
