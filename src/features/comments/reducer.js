import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
// import * as Actions from './actions';

const initialState = {
  comments: [],
  commentComments: [],
  commentLikes: [],
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
    getCommentComments: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.commentComments.push(payload);
    },
    getComment: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      if (payload.postId) state.comments.push(payload);
      if (payload.commentId) {
        state.comments[
          state.comments.findIndex((comment) => {
            return comment.id === payload.commentId;
          })
        ].comments.push(payload);
      }
    },
    createComment: (state, { payload }) => {
      state.loading = false;
      state.error = null;
    },
    replyComment: (state, { payload }) => {
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
      state.comments = state.comments.filter((comment) => {
        comment.comments = comment.comments.filter((reply) => {
          return reply.id !== payload;
        });
        return comment.id !== payload;
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
      const commentId = state.comments.findIndex((x) => {
        return x.id === payload.commentId;
      });
      state.comments[commentId] = {
        ...state.comments[commentId],
        likes: payload.likes,
        dislikes: payload.dislikes,
        likesCount: payload.likesCount,
        dislikesCount: payload.dislikesCount,
      };
      state.commentLikes = payload;
    },
  },
});

export const {
  getComments,
  createComment,
  replyComment,
  updateComment,
  deleteComment,
  commentsPending,
  commentsError,
  getComment,
  getLikes,
  addLike,
  removeLike,
} = commentsSlice.actions;

export default commentsSlice.reducer;
