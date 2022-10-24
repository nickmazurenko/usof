import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from '../components/postPage/CommentSection';
import PostBody from '../components/postPage/PostBody';
import { getPost } from '../features/posts/actions';
import CardLoader from '../components/CardLoader';

const PostPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { post, loading } = useSelector((storeState) => {
    return storeState.posts;
  });
  useEffect(() => {
    dispatch(getPost(params.postId));
  }, [dispatch]);
  return (
    <>
      {loading || !post ? (
        <CardLoader />
      ) : (
        <div className='mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert'>
          <PostBody post={post} />
          <CommentSection post={post} />
        </div>
      )}
    </>
  );
};

export default PostPage;
