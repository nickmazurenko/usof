/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';

import * as Endpoints from './endpoints';

const headers = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getPostComments = (id) =>
  axios.get(Endpoints.postComments.replace('{id}', id));

export const getIdComment = (id) =>
  axios.get(Endpoints.commentId.replace('{id}', id));

export const createComment = (id, data) =>
  axios.post(Endpoints.createComment.replace('{id}', id), data, headers.headers);

export const updateComment = (id, data) =>
  axios.patch(Endpoints.updateComment.replace('{id}', id), data, headers);

export const deleteComment = (id) =>
  axios.delete(Endpoints.deleteComment.replace('{id}', id));
