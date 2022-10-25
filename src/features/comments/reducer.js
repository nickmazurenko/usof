import { createSlice } from '@reduxjs/toolkit';
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
