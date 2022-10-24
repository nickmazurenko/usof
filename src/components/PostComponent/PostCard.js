import { HiOutlineChat, HiOutlineThumbUp } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import Category from './Category';

const PostCard = ({ post }) => {
  const navigate = useNavigate();

  const routeChange = (path, params) => {
    navigate(path, { state: params });
  };

  return (
    <div
      onClick={() => {
        routeChange('/post', { id: post.id });
      }}
      className='flex items-center'>
      <div className='rounded-xl border p-5 shadow-md bg-amber-200'>
        <div className='flex w-full items-center justify-between border-b pb-3'>
          <div
            onClick={() => {
              routeChange('/user', { id: post.userId });
            }}
            className='flex items-center space-x-3'>
            <div className="h-8 w-8 rounded-full bg-slate-400 bg-[url('https://i.pravatar.cc/32')]"></div>
            <div className='text-lg font-bold text-slate-700'>Joe Smith</div>
          </div>
          <div className='flex items-center space-x-2'>
            <div className='flex flex-wrap text-white'>
              <Category />
            </div>

            <div className='text-xs flex-none text-neutral-500'>
              2 hours ago
            </div>
          </div>
        </div>

        <div className='mt-4 mb-6'>
          <div className='mb-3 text-xl font-bold'>
            Nulla sed leo tempus, feugiat velit vel, rhoncus neque?
          </div>
          <div className='text-sm text-neutral-600'>
            Aliquam a tristique sapien, nec bibendum urna. Maecenas convallis
            dignissim turpis, non suscipit mauris interdum at. Morbi sed
            gravida...
          </div>
        </div>

        <div>
          <div className='flex items-center justify-between text-gray-600 font-bold text-lg'>
            <div className='flex space-x-4 md:space-x-8'>
              <div className='flex cursor-pointer items-center transition hover:text-slate-600'>
                <HiOutlineChat size={25} />
                <span className='ml-2'>125</span>
              </div>
              <div className='flex cursor-pointer items-center transition hover:text-slate-600'>
                <HiOutlineThumbUp size={25} />
                <span className='ml-2'>4</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
