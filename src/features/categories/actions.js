import * as Categories from '../../api/categories';

import {
  categoriesError,
  categoriesPending,
  getCategories as _getCategories,
  getCategory as _getCategory,
} from './reducer';

export const getCategories = () => {
  return async (dispatch) => {
    dispatch(categoriesPending());
    try {
      const response = await Categories.getCategories();
      dispatch(_getCategories(response.data.data));
    } catch (error) {
      dispatch(categoriesError(error.response.data));
    }
  };
};

export const getCategory = (id) => {
  return async (dispatch) => {
    dispatch(categoriesPending());
    try {
      const response = await Categories.getIdCategory(id);
      dispatch(_getCategory(response.data.data));
    } catch (error) {
      dispatch(categoriesError(error.response.data));
    }
  };
};
