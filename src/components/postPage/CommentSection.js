import { Button } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import CommentCard from './CommentCard';
import CardLoader from '../CardLoader';
import { createComment, getComments } from '../../features/comments/actions';

const CommentSection = ({ post }) => {
  const [commentState, setCommentState] = useState();
  const dispatch = useDispatch();
  const { comments, loading } = useSelector((storeState) => {
    return storeState.comments;
  });
  const addComment = (e) => {
    e.preventDefault();
    dispatch(createComment(post.id, commentState));
    setCommentState('');
  };

  const handleChange = (e) => {
    setCommentState(e.target.value);
  };

  useEffect(() => {
    dispatch(getComments(post.id));
  }, [dispatch]);
  return (
    <div>
      <div className='flex justify-between items-center my-5 mx-2'>
        <h2 className='text-lg lg:text-2xl font-bold text-gray-900 dark:text-white'>
          Comments ({comments.length})
        </h2>
      </div>
      <div className='mb-6'>
        <div className='py-2 px-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
          <label htmlFor='comment' className='sr-only'>
            Your comment
          </label>
          <textarea
            id='comment'
            value={commentState}
            onChange={handleChange}
            rows='3'
            className='px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
            placeholder='Write a comment...'
            required></textarea>
        </div>
        <div className='w-1/3 mt-2'>
          <Button onClick={addComment}>Add comment</Button>
        </div>
        {post.commentsCount ? (
          <div>
            {loading ? (
              <CardLoader />
            ) : (
              [...comments]
                .sort((a, b) => {
                  return b.likesCount - a.likesCount;
                })
                .map((comment) => {
                  return <CommentCard key={comment.id} comment={comment} />;
                })
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CommentSection;
