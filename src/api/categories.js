/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';
import * as Endpoints from './endpoints';

const headers = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getCategories = () =>
  axios.get(Endpoints.categories);

export const getIdCategory = (id) =>
  axios.get(Endpoints.categoriesId.replace('{id}', id));

export const getPostCategories = (id) =>
  axios.get(Endpoints.postCategories.replace('{id}', id));

export const createCategory = (data) =>
  axios.post(Endpoints.createCategory, data, headers);

export const updateCategory = (data) =>
  axios.patch(Endpoints.updateCategory, data, headers);

export const deleteCategory = (id) =>
  axios.delete(Endpoints.deleteCategory.replace('{id}', id));
