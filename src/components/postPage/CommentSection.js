import { Button, Dropdown } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  HiCalendar,
  HiSortAscending,
  HiSortDescending,
  HiThumbUp,
} from 'react-icons/hi';
import CommentCard from './CommentCard';
import CardLoader from '../CardLoader';
import { createComment, getComments } from '../../features/comments/actions';
import config from '../../config';

const COMMENTS_MAX = config.COMMENTS_COUNT;

const getSortedComments = (comments, sort, getAll) => {
  const sorted = [...comments].sort((a, b) => {
    if (sort.param === 'date') {
      return sort.ascending
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    }
    return sort.ascending
      ? a[sort.param] - b[sort.param]
      : b[sort.param] - a[sort.param];
  });
  return getAll ? sorted : sorted.slice(0, COMMENTS_MAX);
};

const CommentSection = ({ post }) => {
  const [commentState, setCommentState] = useState();
  const [sort, setSort] = useState({ param: 'likesCount', ascending: false });
  const [getAll, setGetAll] = useState(false);
  const dispatch = useDispatch();
  const { comments, loading } = useSelector((storeState) => {
    return storeState.comments;
  });

  const sortBy = (param) => {
    const newSort = {
      param,
      ascending: sort.param === param ? !sort.ascending : false,
    };
    setSort(newSort);
  };

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
      <div className='mb-6'>
        <div className='my-2 px-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
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
        <div className='flex justify-between items-center my-5 mx-2'>
          <h2 className='text-lg lg:text-2xl font-bold text-gray-900 dark:text-white'>
            Comments ({comments.length})
          </h2>
          <Dropdown
            size='sm'
            arrowIcon={false}
            label={
              <>
                <span className='mr-4'>
                  {sort.param.charAt(0).toUpperCase() + sort.param.slice(1)}
                </span>
                {sort.ascending ? (
                  <HiSortAscending size={25} />
                ) : (
                  <HiSortDescending size={25} />
                )}
              </>
            }>
            <Dropdown.Item
              onClick={() => {
                sortBy('date');
              }}
              icon={HiCalendar}>
              Date
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                sortBy('likesCount');
              }}
              icon={HiThumbUp}>
              Likes
            </Dropdown.Item>
          </Dropdown>
        </div>
        {post.commentsCount ? (
          <div>
            {loading ? (
              <CardLoader />
            ) : (
              getSortedComments(comments, sort, getAll).map((comment) => {
                return <CommentCard key={comment.id} comment={comment} />;
              })
            )}
          </div>
        ) : null}
        {COMMENTS_MAX < comments.length ? (
          <div className='p-1 pr-3'>
            <Button
              size='xs'
              color='dark'
              onClick={() => {
                setGetAll(!getAll);
              }}>
              {getAll ? 'Hide...' : 'Show all...'}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CommentSection;
