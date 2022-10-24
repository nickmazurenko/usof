import { Tooltip, Button } from 'flowbite-react';

const UserPopOver = ({ user }) => {
  return (
    <>
      <div className='inline-block absolute z-10 w-70 -top-6 -left-10 text-sm font-light rounded-lg border  shadow-sm text-gray-400 bg-gray-800 border-gray-600'>
        <div className='p-3'>
          <div className='flex justify-between items-center mb-2'>
            <a href='#'>
              <img
                className='w-10 h-10 rounded-full'
                crossOrigin='anonymous'
                src={user.profilePicture}
              />
            </a>
          </div>
          <p className='text-base font-semibold leading-none text-gray-900 dark:text-white'>
            <a href='#'>{user.fullName}</a>
          </p>
          <p className='mb-3 text-sm font-normal'>
            <a href='#' className='hover:underline'>
              @{user.login}
            </a>
          </p>
          <ul className='flex flex-col lg:flex-row text-sm font-light'>
            <li className='mr-2'>
              <a href='#' className='hover:underline'>
                <span className='font-semibold text-gray-900 dark:text-white'>
                  {user.postsCount}
                </span>
                <span> Posts </span>
              </a>
            </li>
            <li className='mr-2'>
              <a href='#' className='hover:underline'>
                <span className='font-semibold text-gray-900 dark:text-white'>
                  {user.rating}
                </span>
                <span> Rating </span>
              </a>
            </li>
            <li className='mr-2'>
              <a href='#' className='hover:underline'>
                <span className='font-semibold text-gray-900 dark:text-white'>
                  {user.views}
                </span>
                <span> Views </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserPopOver;
