/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';
import * as Endpoints from './endpoints';

const headers = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getPosts = (id) => {
  return axios.get(Endpoints.posts, { params: { id } }, headers);
};

export const getIdPost = (id) => {
  return axios.get(Endpoints.postId.replace('{id}', id));
};

export const createPost = (data) => {
  const body = JSON.stringify(data);
  return axios.post(Endpoints.createPost, body, headers);
};

export const deletePost = (id) => {
  return axios.delete(Endpoints.deletePost.replace('{id}', id));
};

export const updatePost = (data, id) => {
  const body = JSON.stringify(data);
  return axios.patch(Endpoints.updatePost.replace('{id}', id), body, headers);
};

export const getCategoryPosts = (id) => {
  return axios.get(Endpoints.getCategoryPosts.replace('{id}', id));
};
