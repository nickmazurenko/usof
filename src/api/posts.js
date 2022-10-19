/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';
import * as Endpoints from './endpoints';

const headers = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getPosts = (params = {}) =>
  axios.get(Endpoints.posts, { params }, headers);

export const getIdPost = (id) =>
  axios.get(Endpoints.postId.replace('{id}', id));

export const createPost = (data) =>
  axios.post(Endpoints.createPost, data, headers);

export const deletePost = (id) =>
  axios.delete(Endpoints.deletePost.replace('{id}', id));

export const updatePost = (data, id) =>
  axios.patch(Endpoints.updatePost.replace('{id}', id), data, headers);

export const getCategoryPosts = (id) =>
  axios.patch(Endpoints.getCategoryPosts.replace('{id}', id));
