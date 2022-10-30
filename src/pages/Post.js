import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from '../components/postPage/CommentSection';
import PostBody from '../components/postPage/PostBody';
import { getPost } from '../features/posts/actions';
import { getComments } from '../features/comments/actions';
import CardLoader from '../components/CardLoader';

const PostPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { post, loading } = useSelector((storeState) => {
    return storeState.posts;
  });
  useEffect(() => {
    dispatch(getPost(params.postId));
    dispatch(getComments(params.postId));
  }, [dispatch]);
  return (
    <>
      {loading || !post ? (
        <CardLoader />
      ) : (
        <div className='flex flex-col lg:ml-20 px-5 w-full lg:w-11/12 '>
          <PostBody post={post} />
          <CommentSection post={post} />
        </div>
      )}
    </>
  );
};

export default PostPage;
