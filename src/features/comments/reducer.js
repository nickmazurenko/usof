import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
// import * as Actions from './actions';

const initialState = {
  comments: [],
  comment: null,
  loading: false,
  error: false,
};

const commentsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    commentsPending: (state) => {
      state.loading = true;
    },
    commentsError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.comments = [];
      toast.error(payload.message, {
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
    },
    getComments: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.comments = payload;
    },
    getComment: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.comments.push(payload);
    },
    createComment: (state, { payload }) => {
      state.loading = false;
      state.error = null;
    },
    updateComment: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.comments[
        state.comments.findIndex((comment) => {
          return comment.id === payload.id;
        })
      ] = payload;
    },
    deleteComment: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.comments.filter((comment) => {
        return comment.id !== payload.id;
      });
    },
  },
});

export const {
  getComments,
  createComment,
  updateComment,
  deleteComment,
  commentsPending,
  commentsError,
  getComment,
} = commentsSlice.actions;

export default commentsSlice.reducer;
