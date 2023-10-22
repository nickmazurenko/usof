import moment from 'moment';
import {
  HiCalendar,
  HiChat,
  HiDocumentText,
  HiEye,
  HiMail,
  HiThumbUp,
  HiUser,
  HiViewGrid,
} from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import CardLoader from './CardLoader';
import PostCard from './postsPage/PostCard';

const Profile = ({ user }) => {
  const navigate = useNavigate();
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
    recentPosts,
  } = user;
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-10 px-10 py-5'>
      <div>
        <div className='w-full pt-5'>
          <img
            crossOrigin='anonymous'
            src={profilePicture}
            className='rounded-full mx-auto w-1/3 shadow-md border-4 border-white transition duration-200 transform hover:scale-110'></img>
        </div>
        <h1 className='w-full font-bold my-2 text-center text-3xl text-gray-200'>
          {fullName || login}
        </h1>
        <h3 className='w-full font-bold my-2 text-center text-1xl text-gray-300'>
          {login}
        </h3>
        <div className='flex mt-4 text-2xl md:text-3xl'>
          <div
            title='Rating'
            className='text-center w-1/3 p-4 mt-2 mr-2  bg-gray-900  rounded-xl border-2 cursor-pointer text-gray-300 font-bold'>
            {rating} <HiThumbUp className='m-2 h-10 inline-block' />
          </div>
          <div
            title='Posts Count'
            className='text-center w-1/3 p-4 mt-2 mr-2  bg-gray-900  rounded-xl border-2 cursor-pointer text-gray-300 font-bold'>
            <div onClick={() => { navigate(`/posts/users/${user.id}`); }}>
              {postsCount} <HiDocumentText className='m-2 h-10 inline-block' />
            </div>
          </div>
          <div
            title='Views'
            className='text-center w-1/3 p-4 mt-2 bg-gray-900  rounded-xl border-2 cursor-pointer text-gray-300 font-bold'>
            {views} <HiEye className='m-2 h-10 inline-block' />
          </div>
        </div>
        <div className='flex text-3xl'>
          <div
            title='Comments Count'
            className='text-center w-1/2 p-4 mt-2 mr-2  bg-gray-900  rounded-xl border-2 cursor-pointer text-gray-300 font-bold'>
            {commentsCount} <HiChat className='m-2 h-10 inline-block' />
          </div>
          <div
            title='Categories Count'
            className='text-center w-1/2 p-4 mt-2  bg-gray-900  rounded-xl border-2 cursor-pointer text-gray-300 font-bold'>
            {categoriesCount}
            <HiViewGrid className='m-2 h-10 inline-block' />
          </div>
        </div>
        <div className='mt-2 grid gap-2 grid-cols-1 lg:grid-cols-2'>
          <div
            title='Account Creation Date'
            className='w-full p-4 bg-gray-900 text-center rounded-xl border-2 cursor-pointer text-xl md:text-2xl text-gray-300 font-bold'>
            <HiCalendar className='m-2 h-10 inline-block' />{' '}
            {`Member for ${moment(createdAt).fromNow(true)}`}
          </div>
          {role === 'user' ? (
            <div
              title='Categories Count'
              className='text-center w-full p-4 bg-gray-900  rounded-xl border-2 cursor-pointer text-xl md:text-2xl text-gray-300 font-bold'>
              <HiUser className='m-2 h-10 inline-block' /> {role}
            </div>
          ) : (
            <div
              title='Categories Count'
              className='text-center w-full p-4 bg-pink-400  rounded-xl border-2 cursor-pointer text-xl md:text-2xl text-gray-900 font-bold'>
              <HiUser className='m-2 h-10 inline-block' /> {role}
            </div>
          )}
        </div>
        <div
          title='Email'
          className='mt-2 w-full p-4 bg-gray-900 text-center rounded-xl border-2 cursor-pointer text-md md:text-xl text-gray-300 font-bold'>
          <HiMail className='m-2 h-10 inline-block' /> {email}
        </div>
      </div>
      <div>
        <h1 className='w-full font-bold my-5 text-center text-3xl text-gray-200'>
          Top Posts
        </h1>
        {recentPosts.length ? (
          recentPosts.map((post) => {
            return <PostCard key={post.id} post={post} />;
          })
        ) : (
          <CardLoader />
        )}
      </div>
    </div>
  );
};

export default Profile;
