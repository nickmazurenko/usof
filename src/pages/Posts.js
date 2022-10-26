/* eslint-disable arrow-body-style */
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getCategoryPosts,
  getPosts,
  getUserPosts,
} from '../features/posts/actions';
import CardLoader from '../components/CardLoader';
import PostsTable from '../components/postsPage/PostsTable';
import { getCategory } from '../features/categories/actions';
import { getUser } from '../features/users/actions';

const PostsPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const state = useSelector((storeState) => storeState);
  const { loading, error, posts, categoryPosts, userPosts } = state.posts;
  const { category } = state.categories;
  const { user } = state.users;
  useEffect(() => {
    if (params.categoryId) {
      dispatch(getCategoryPosts(params.categoryId));
      dispatch(getCategory(params.categoryId));
    }
    if (params.userId) {
      dispatch(getUserPosts(params.userId));
      dispatch(getUser(params.userId));
    }
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <>
      {loading || posts.length === 0 ? (
        <CardLoader />
      ) : (
        <div>
          <PostsTable
            posts={() => {
              if (params.categoryId) return categoryPosts;
              if (params.userId) return userPosts;
              return posts;
            }}
            category={category}
            loading={loading}
            user={user}
          />
        </div>
      )}
    </>
  );
};

export default PostsPage;
