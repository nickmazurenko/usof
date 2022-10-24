/* eslint-disable indent */
import { HiOutlineThumbUp, HiOutlineThumbDown, HiEye } from 'react-icons/hi';
import moment from 'moment';
import Category from '../postsPage/Category';

const PostBody = ({ post }) => {
  return (
    <div className='w-full flex items-center mt-5 rounded-xl bg-gray-800'>
      <div className='w-full rounded-xl border p-5 '>
        <div className='flex w-full items-center flex-wrap justify-between border-b pb-3'>
          <div
            onClick={() => {
              routeChange('/user', { id: post.userId });
            }}
            className='cursor-pointer flex items-center space-x-3'>
            <img
              className='h-8 w-8 rounded-full bg-slate-400'
              crossOrigin='anonymous'
              src={post.profilePicture}
            />
            <div className='text-lg font-bold text-gray-300'>{post.login}</div>
          </div>
          <div className='flex items-center my-2 space-x-2'>
            <div className='text-xs flex-none text-gray-100'>
              <span className='font-semibold text-white m'>Asked</span>{' '}
              {moment(post.createdAt).fromNow()}
            </div>
            <div className='text-xs flex-none text-gray-100'>
              <span className='font-semibold text-white m'>Modified</span>{' '}
              {moment(post.updatedAt).fromNow()}
            </div>
          </div>
        </div>

        <div className='flex flex-col mt-4 mb-6'>
          <div className='mb-3 text-xl font-bold text-white'>{post.title}</div>
          <div className='text-sm text-gray-100'>{post.postContent}</div>
        </div>
        <div className='flex items-end flex-col justify-between'>
          <div className='flex w-2/3 flex-wrap items-end justify-end text-white mb-5'>
            {post.categories.length
              ? post.categories.map((category) => {
                  return <Category key={category.id} category={category} />;
                })
              : null}
          </div>

          <div>
            <div className='flex flex-wrap items-center justify-between text-gray-100 font-bold text-lg'>
              <div className='flex space-x-4 md:space-x-8 mx-5'>
                <div className='flex cursor-pointer items-center transition hover:text-slate-600'>
                  <HiOutlineThumbUp size={25} />
                  <span className='ml-2'>{post.likesCount}</span>
                </div>
                <div className='flex cursor-pointer items-center transition hover:text-slate-600'>
                  <HiOutlineThumbDown size={25} />
                  <span className='ml-2'>{post.dislikesCount}</span>
                </div>
                <div className='flex cursor-pointer items-center'>
                  <HiEye size={25} />
                  <span className='ml-2'>{post.views}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostBody;
