/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';

import * as Endpoints from './endpoints';

const headers = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getPostComments = (id) => {
  return axios.get(Endpoints.postComments.replace('{id}', id));
};

export const getIdComment = (id) => {
  return axios.get(Endpoints.commentId.replace('{id}', id));
};

export const createComment = (id, content) => {
  return axios.post(
    Endpoints.createComment.replace('{id}', id),
    { content },
    headers.headers
  );
};

export const updateComment = (id, data) => {
  return axios.patch(
    Endpoints.updateComment.replace('{id}', id),
    data,
    headers
  );
};

export const deleteComment = (id) => {
  return axios.delete(Endpoints.deleteComment.replace('{id}', id));
};
