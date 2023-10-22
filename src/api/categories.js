/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';
import * as Endpoints from './endpoints';

const headers = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getCategories = () => {
  return axios.get(Endpoints.categories);
};

export const getIdCategory = (id) => {
  return axios.get(Endpoints.categoriesId.replace('{id}', id));
};

export const getPostCategories = (id) => {
  return axios.get(Endpoints.postCategories.replace('{id}', id));
};

export const createCategory = (data) => {
  return axios.post(Endpoints.createCategory, data, headers);
};

export const updateCategory = (id, data) => {
  return axios.patch(
    Endpoints.updateCategory.replace('{id}', id),
    data,
    headers
  );
};

export const deleteCategory = (id) => {
  return axios.delete(Endpoints.deleteCategory.replace('{id}', id));
};
