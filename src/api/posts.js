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

export const getPostCategories = (id) =>
  axios.get(Endpoints.getPostCategories.replace('{id}', id));

export const createPost = (data) =>
  axios.post(Endpoints.createPost, data, headers);

export const deletePost = (id) =>
  axios.delete(Endpoints.deletePost.replace('{id}', id));

export const updatePost = (data, id) =>
  axios.patch(Endpoints.updatePost.replace('{id}', id), data, headers);

export const createPostComment = (data, id) =>
  axios.post(Endpoints.createPostComment, data, headers);

export const getPostComments = (id) =>
  axios.get(Endpoints.getPostComments.replace('{id}', id));

export const createPostLike = (data, id) => {
  const body = JSON.stringify(data);
  axios.post(Endpoints.createPostLike.replace('{id}', id), body, headers);
};

export const getPostLikes = (id) =>
  axios.get(Endpoints.getPostLikes.replace('{id}', id));

export const deletePostLike = (id) =>
  axios.delete(Endpoints.deletePostLike.replace('{id}', id));
