import createNotification from '../notifications/actions';
import * as Types from './types';
import * as categoriesApi from '../../api/categories';

export const getCategory = (id) => async (dispatch) => {
  try {
    const response = await categoriesApi.getIdCategory(id);
    dispatch({
      type: Types.GET_CATEGORY,
      data: response.data.data,
    });
  } catch (error) {
    dispatch(createNotification(error.response.data.message, 'danger'));
    dispatch({
      type: Types.CATEGORIES_ERROR,
      data: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getPostCategories = (id) => async (dispatch) => {
  try {
    const response = await categoriesApi.getPostCategories(id);
    dispatch({
      type: Types.GET_POST_CATEGORIES,
      data: response.data.data,
    });
  } catch (error) {
    dispatch(createNotification(error.response.data.message, 'danger'));
    dispatch({
      type: Types.CATEGORIES_ERROR,
      data: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    const response = await categoriesApi.deleteCategory(id);
    dispatch({
      type: Types.DELETE_CATEGORY,
      data: response.data.data,
    });
  } catch (error) {
    dispatch(createNotification(error.response.data.message, 'danger'));
    dispatch({
      type: Types.CATEGORIES_ERROR,
      data: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getCategories = () => async (dispatch) => {
  try {
    const response = await categoriesApi.getCategories();
    dispatch({
      type: Types.GET_CATEGORIES,
      data: response.data.data,
    });
  } catch (error) {
    dispatch(createNotification(error.response.data.message, 'danger'));
    dispatch({
      type: Types.CATEGORIES_ERROR,
      data: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const createCategory = (data) => async (dispatch) => {
  try {
    const response = await categoriesApi.createCategory(data);
    dispatch({
      type: Types.CREATE_CATEGORY,
      data: response.data.data,
    });
  } catch (error) {
    dispatch(createNotification(error.response.data.message, 'danger'));
    dispatch({
      type: Types.CATEGORIES_ERROR,
      data: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const updateCategory = (data) => async (dispatch) => {
  try {
    const response = await categoriesApi.updateCategory(data);
    dispatch({
      type: Types.UPDATE_CATEGORY,
      data: response.data.data,
    });
  } catch (error) {
    dispatch(createNotification(error.response.data.message, 'danger'));
    dispatch({
      type: Types.CATEGORIES_ERROR,
      data: {
        message: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
