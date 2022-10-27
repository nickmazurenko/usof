import { Button } from 'flowbite-react';
import {
  HiEye,
  HiOutlineChat,
  HiOutlineThumbDown,
  HiOutlineThumbUp,
} from 'react-icons/hi';
import moment from 'moment';
import removeMD from 'remove-markdown';
import CardLoader from '../CardLoader';
import Category from './Category';

const cutContent = (content) => {
  return content.length > 200 ? `${content.slice(0, 200)}...` : content;
};

const PostCard = ({ post }) => {
  return (
    <>
      {post ? (
        <div className='w-full flex items-center mt-5 bg-gray-900 rounded-xl'>
          <div className='w-full rounded-xl border border-gray-500 p-5 '>
            <div className='flex w-full items-center flex-wrap justify-between border-gray-500 border-b-2 pb-3'>
              <a href={`/user/${post.userId}`}>
                <div className='cursor-pointer flex items-center space-x-3'>
                  <img
                    className='h-8 w-8 rounded-full bg-slate-300'
                    crossOrigin='anonymous'
                    src={post.profilePicture}
                  />
                  <div className='text-lg font-bold text-slate-300'>
                    {post.login || 'deleted'}
                  </div>
                </div>
              </a>
              <div className='flex items-center space-x-2'>
                {post.categories.length ? (
                  <div className='flex flex-wrap text-white'>
                    {post.categories.map((category) => {
                      return <Category category={category} key={category.id} />;
                    })}
                  </div>
                ) : null}
                <div className='text-xs flex-none text-neutral-500'>
                  {moment(post.createdAt).fromNow()}
                </div>
              </div>
            </div>

            <div className='flex flex-col mt-4 mb-6'>
              <div className='mb-3 text-xl text-gray-300 font-bold'>{post.title}</div>
              <div className='text-sm text-neutral-400 whitespace-pre-line'>
                {removeMD(cutContent(post.content))}
              </div>
            </div>

            <div>
              <div className='flex flex-wrap items-center justify-between text-gray-400 font-bold text-lg'>
                <div className='flex space-x-4 md:space-x-8'>
                  <div className='flex cursor-pointer items-center transition hover:text-slate-600'>
                    <HiOutlineChat size={25} />
                    <span className='ml-2'>{post.commentsCount}</span>
                  </div>
                  <div className='flex cursor-pointer items-center transition hover:text-slate-600'>
                    <HiOutlineThumbUp size={25} />
                    <span className='ml-2'>{post.likesCount}</span>
                  </div>
                  <div className='flex cursor-pointer items-center transition hover:text-slate-600'>
                    <HiOutlineThumbDown size={25} />
                    <span className='ml-2'>{post.dislikesCount}</span>
                  </div>
                  <div className='flex cursor-pointer items-center transition hover:text-slate-600'>
                    <HiEye size={25} />
                    <span className='ml-2'>{post.views}</span>
                  </div>
                </div>
                <div className=' flex items-center text-xs flex-none text-neutral-500'>
                  <a href={`/post/${post.id}`}>
                    <Button>See full...</Button>
                  </a>
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

export default PostCard;
