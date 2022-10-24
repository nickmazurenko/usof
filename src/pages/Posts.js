import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCategoryPosts, getPosts } from '../features/posts/actions';
import CardLoader from '../components/CardLoader';
import PostsTable from '../components/postsPage/PostsTable';

const PostsPage = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const { loading, error, posts, categoryPosts } = useSelector((storeState) => {
    return storeState.posts;
  });
  useEffect(() => {
    console.log(params);
    if (params.categoryId) {
      dispatch(getCategoryPosts(params.categoryId));
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
            posts={params.categoryId ? categoryPosts : posts}
            loading={loading}
          />
        </div>
      )}
    </>
  );
};

export default PostsPage;
