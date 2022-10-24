import { createSlice } from '@reduxjs/toolkit';
// import * as Actions from './actions';

const initialState = {
  posts: [],
  categoryPosts: [],
  post: null,
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postsPending: (state) => {
      state.loading = true;
    },
    postsError: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      state.users = null;
    },
    getPosts: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.posts = payload;
    },
    getCategoryPosts: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.categoryPosts = payload;
    },
    getPost: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.post = payload;
    },
    createPost: (state, { payload }) => {
      state.posts = [payload, ...state.posts];
      state.loading = false;
      state.error = null;
    },
    updatePost: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.posts[
        state.posts.findIndex((post) => {
          return post.id === payload.id;
        })
      ] = payload;
      state.loading = false;
      state.error = null;
    },
    deletePost: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.posts.filter((post) => {
        return post.id !== payload.id;
      });
    },
  },
});

export const {
  postsPending,
  postsError,
  getPosts,
  getPost,
  updatePost,
  createPost,
  deletePost,
  getCategoryPosts
} = postsSlice.actions;

export default postsSlice.reducer;
