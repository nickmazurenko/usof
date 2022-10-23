import { Tooltip } from 'flowbite-react';
import {
  HiAcademicCap,
  HiCalendar,
  HiChat,
  HiDocumentText,
  HiEye,
  HiMail,
  HiThumbUp,
  HiUser,
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
    <div>
      <div className='w-full pt-5'>
        <img
          src={profilePicture}
          className='rounded-full mx-auto w-1/3 shadow-md border-4 border-white transition duration-200 transform hover:scale-110'></img>
      </div>
      <h1 className='w-full font-bold my-2 text-center text-3xl text-gray-100'>
        {fullName || login}
      </h1>
      <h3 className='w-full font-bold my-2 text-center text-1xl text-gray-300'>
        {login}
      </h3>
      <div className='flex mt-4'>
        <div
          title='Rating'
          className='text-center w-1/3 p-4 mt-2 mr-2  bg-amber-300  rounded-xl border-2 cursor-pointer text-3xl text-gray-800 font-bold'>
          {rating} <HiThumbUp className='m-2 h-10 inline-block' />
        </div>
        <div
          title='Posts Count'
          className='text-center w-1/3 p-4 mt-2 mr-2  bg-amber-300  rounded-xl border-2 cursor-pointer text-3xl text-gray-800 font-bold'>
          {postsCount} <HiDocumentText className='m-2 h-10 inline-block' />
        </div>
        <div
          title='Views'
          className='text-center w-1/3 p-4 mt-2 bg-amber-300  rounded-xl border-2 cursor-pointer text-3xl text-gray-800 font-bold'>
          {views} <HiEye className='m-2 h-10 inline-block' />
        </div>
      </div>
      <div className='flex'>
        <div
          title='Comments Count'
          className='text-center w-1/2 p-4 mt-2 mr-2  bg-amber-300  rounded-xl border-2 cursor-pointer text-3xl text-gray-800 font-bold'>
          {commentsCount} <HiChat className='m-2 h-10 inline-block' />
        </div>
        <div
          title='Categories Count'
          className='text-center w-1/2 p-4 mt-2  bg-amber-300  rounded-xl border-2 cursor-pointer text-3xl text-gray-800 font-bold'>
          {categoriesCount}
          <HiViewGrid className='m-2 h-10 inline-block' />
        </div>
      </div>
      <div className='mt-2 grid gap-2 grid-cols-1 lg:grid-cols-2'>
        <div
          title='Account Creation Date'
          className='w-full p-4 bg-amber-300 text-center rounded-xl border-2 cursor-pointer text-xl md:text-2xl text-gray-800 font-bold'>
          <HiCalendar className='m-2 h-10 inline-block' /> {getDate(createdAt)}
        </div>
        {role === 'user' ? (
          <div
            title='Categories Count'
            className='text-center w-full p-4 bg-amber-300  rounded-xl border-2 cursor-pointer text-xl md:text-2xl text-gray-800 font-bold'>
            <HiUser className='m-2 h-10 inline-block' /> {role}
          </div>
        ) : (
          <div
            title='Categories Count'
            className='text-center w-full p-4 bg-pink-400  rounded-xl border-2 cursor-pointer text-xl md:text-2xl text-gray-800 font-bold'>
            <HiUser className='m-2 h-10 inline-block' /> {role}
          </div>
        )}
      </div>
      <div
        title='Email'
        className='mt-2 w-full p-4 bg-amber-300 text-center rounded-xl border-2 cursor-pointer text-md md:text-xl text-gray-800 font-bold'>
        <HiMail className='m-2 h-10 inline-block' /> {email}
      </div>
      <h1 className='w-full font-bold mt-5 text-center text-3xl text-gray-100'>
        Recent Posts
      </h1>
    </div>
  );
};

export default Profile;
