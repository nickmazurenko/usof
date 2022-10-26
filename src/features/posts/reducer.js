import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  posts: [],
  categoryPosts: [],
  userPosts: [],
  post: null,
  postLikes: [],
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
      toast.error(payload.message, {
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      });
    },
    getPosts: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.posts = payload;
    },
    getUserPosts: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.userPosts = payload;
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
    addLike: (state, { payload }) => {
      state.loading = false;
      state.error = null;
    },
    removeLike: (state, { payload }) => {
      state.loading = false;
      state.error = null;
    },
    getLikes: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      const postId = state.posts.findIndex((x) => {
        return x.id === payload.postId;
      });
      state.posts[postId] = {
        ...state.posts[postId],
        likesCount: payload.likesCount,
        dislikesCount: payload.dislikesCount,
      };
      state.postLikes = payload;
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
  getCategoryPosts,
  getUserPosts,
  addLike,
  removeLike,
  getLikes
} = postsSlice.actions;

export default postsSlice.reducer;
