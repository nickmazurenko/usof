import { ListGroup } from 'flowbite-react';
import {
  HiChat,
  HiDocumentText,
  HiEye,
  HiThumbUp,
  HiViewGrid,
} from 'react-icons/hi';

/* eslint-disable object-curly-newline */
const getDate = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('de-DE');
};
const Profile = ({ user }) => {
  const {
    profilePicture,
    login,
    role,
    fullName,
    email,
    rating,
    views,
    createdAt,
    postsCount,
    commentsCount,
    categoriesCount,
  } = user;
  return (
    <div className='w-auto grid grid-cols-1 md:grid-cols-2 bg-gray-200 shadow rounded-xl my-10'>
      <div className='object-cover col-span-2 w-full pt-5'>
        <img
          src={profilePicture}
          alt=''
          className='object-cover col-span-2 justify-center rounded-full mx-auto w-1/3 shadow-md border-4 border-white transition duration-200 transform hover:scale-110'></img>
      </div>
      <h1 className='object-cover col-span-2 w-full font-bold text-center text-3xl text-gray-800'>
        {fullName || login}
      </h1>
      <div className='object-cover col-span-2 w-full flex mt-5 p-2'>
        <div
          title='Rating'
          className='text-center w-1/3 p-4 m-2  bg-amber-300  rounded-xl border-2 cursor-pointer text-3xl text-gray-800 font-bold'>
          {rating} <HiThumbUp className='m-2 h-10 inline-block' />
        </div>
        <div
          title='Posts Count'
          className='text-center w-1/3 p-4 m-2  bg-amber-300  rounded-xl border-2 cursor-pointer text-3xl text-gray-800 font-bold'>
          {postsCount} <HiDocumentText className='m-2 h-10 inline-block' />
        </div>
        <div
          title='Views'
          className='text-center w-1/3 p-4 m-2  bg-amber-300  rounded-xl border-2 cursor-pointer text-3xl text-gray-800 font-bold'>
          {views} <HiEye className='m-2 h-10 inline-block' />
        </div>
      </div>
      <div className='object-cover col-span-2 flex p-2'>
        <div
          title='Comments Count'
          className='text-center w-1/2 p-4 m-2  bg-amber-300  rounded-xl border-2 cursor-pointer text-3xl text-gray-800 font-bold'>
          {commentsCount} <HiChat className='m-2 h-10 inline-block' />
        </div>
        <div
          title='Categories Count'
          className='text-center w-1/2 p-4 m-2  bg-amber-300  rounded-xl border-2 cursor-pointer text-3xl text-gray-800 font-bold'>
          {categoriesCount}
          <HiViewGrid className='m-2 h-10 inline-block' />
        </div>
      </div>

      <div className='object-cover col-1 px-4 py-5 sm:px-6'>
        <h3 className='text-lg font-medium leading-6 text-gray-900'>
          General Information
        </h3>
        <div className='object-cover col-1'>
        <div className='border-t border-gray-200'>
          <dl className='p-5 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-12 lg:gap-x-8'>
            <div className='border-t w-1/2 border-gray-50 pt-4'>
              <dt className='font-medium text-gray-900'>Email</dt>
              <dd className='mt-2 text-sl text-gray-500'>{email}</dd>
            </div>
            <div className='border-t w-1/2 border-gray-50 pt-4'>
              <dt className='font-medium text-gray-900'>Login</dt>
              <dd className='mt-2 text-sl text-gray-500'>{login}</dd>
            </div>
            <div className='border-y w-1/2 border-gray-50 pt-4'>
              <dt className='font-medium text-gray-900'>Registration date</dt>
              <dd className='mt-2 text-sl text-gray-500'>
                {getDate(createdAt)}
              </dd>
            </div>
            <div className='border-t w-1/2 border-gray-50 pt-4'>
              <dt className='font-medium text-gray-900'>Role</dt>
              <dd className='mt-2 text-sl text-gray-500'>{role}</dd>
            </div>
          </dl>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Profile;
