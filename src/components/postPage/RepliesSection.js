/* eslint-disable arrow-body-style */
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import Reply from './Reply';
import { replyComment } from '../../features/comments/actions';

const RepliesSection = ({ comments, commentId }) => {
  const dispatch = useDispatch();
  const [reply, setReply] = useState('');
  const [getAll, setGetAll] = useState(false);

  const getComments = () => {
    return getAll ? comments : comments.slice(0, 2);
  };

  const onChange = (e) => {
    setReply(e.target.value);
  };

  const onAdd = () => {
    if (reply.length > 0) dispatch(replyComment(commentId, reply));
  };

  return (
    <div className='flex flex-col justify-end items-end mt-1 space-y-1'>
      {getComments().map((comment) => (
        <Reply key={comment.id} comment={comment} />
      ))}
      {comments.length > 2 ? (
        <div
          onClick={() => setGetAll(!getAll)}
          className='flex justify-center items-center text-white rounded-xl cursor-pointer text-xs w-11/12 h-4 bg-gray-900 hover:bg-gray-900'>
          {getAll ? 'Hide' : 'See all'}
        </div>
      ) : null}

      <div className='space-y-1 w-2/12 focus-within:w-11/12'>
        <input
          id='comment'
          value={reply}
          onChange={onChange}
          className='p-2 w-full h-6 focus-within:h-8 focus-within:text-left text-center rounded-md text-sm text-gray-900 border-0 focus:ring-0 dark:text-white dark:placeholder-gray-400 dark:bg-gray-800'
          placeholder='Reply...'
          required></input>
        {reply.length ? (
          <div
            onClick={onAdd}
            className='flex justify-center items-center text-white rounded-md cursor-pointer text-xs w-1/5 h-6 bg-gray-800 hover:bg-gray-900'>
            Add
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default RepliesSection;
