import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  categories: [],
  category: null,
  loading: false,
  error: false,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoriesPending: (state) => {
      state.loading = true;
    },
    categoriesError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      toast.error(payload.message, {
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
    },
    getCategories: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.categories = payload;
    },
    getCategory: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.category = payload;
    },
  },
});

export const {
  categoriesError,
  categoriesPending,
  getCategories,
  getCategory
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
