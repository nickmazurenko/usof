import { HiOutlineThumbUp, HiOutlineThumbDown } from 'react-icons/hi';
import moment from 'moment';
import CardLoader from '../CardLoader';

const CommentCard = ({ comment }) => {
  return (
    <>
      {comment ? (
        <div className='w-full flex items-center mt-5 rounded-xl bg-gray-800'>
          <div className='w-full rounded-xl shadow-md p-5 '>
            <div className='flex w-full items-center flex-wrap justify-between pb-3'>
              <div
                onClick={() => {
                  routeChange('/user', { id: 1 });
                }}
                className='cursor-pointer flex items-center space-x-3'>
                <img
                  className='h-8 w-8 rounded-full bg-slate-400'
                  crossOrigin='anonymous'
                  src={comment.profilePicture}
                />
                <div className='text-lg font-bold text-gray-300'>
                  {comment.login}
                </div>
              </div>
              <div className='flex items-center space-x-2'>
                <div className='text-xs flex-none text-gray-500'>{moment(comment.createdAt).fromNow()}</div>
              </div>
            </div>

            <div className='flex ml-10 flex-col '>
              <div className='text-sm text-gray-400 font-medium'>
                {comment.content}
              </div>
            </div>
            <div className='flex items-end flex-col justify-between'>
              <div className='flex flex-wrap items-center justify-between text-gray-100 font-bold text-lg'>
                <div className='flex space-x-4 md:space-x-8'>
                  <div className='flex cursor-pointer items-center transition hover:text-slate-600'>
                    <HiOutlineThumbUp size={25} />
                    <span className='ml-2'>{comment.likesCount}</span>
                  </div>
                  <div className='flex cursor-pointer items-center transition hover:text-slate-600'>
                    <HiOutlineThumbDown size={25} />
                    <span className='ml-2'>{comment.dislikesCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <CardLoader />
      )}
    </>
  );
};

export default CommentCard;
