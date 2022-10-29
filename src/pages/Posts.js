/* eslint-disable arrow-body-style */
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
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
  const {
    users: { user },
    categories: { category },
    posts: {
      loading,
      posts,
      categoryPosts,
      userPosts,
      categoryPostsLoading,
      userPostsLoading,
    },
  } = useSelector((storeState) => storeState);
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
      {(params.categoryId && !category) || (params.userId && userPostsLoading) || loading ? (
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
            loading={() => {
              if (params.categoryId) return categoryPostsLoading;
              if (params.userId) return userPostsLoading;
              return loading;
            }}
            user={user}
          />
        </div>
      )}
    </>
  );
};

export default PostsPage;
