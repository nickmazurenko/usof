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

const PostsPage = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { loading, error, posts, categoryPosts, userPosts } = useSelector(
    (storeState) => {
      return storeState.posts;
    }
  );
  useEffect(() => {
    if (params.categoryId) {
      dispatch(getCategoryPosts(params.categoryId));
    }
    if (params.userId) {
      dispatch(getUserPosts(params.userId));
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
            loading={loading}
          />
        </div>
      )}
    </>
  );
};

export default PostsPage;
