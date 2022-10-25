import { Tooltip } from 'flowbite-react';
import UserPopOver from './UserPopover';
import CardLoader from '../CardLoader';

const UserCard = ({ user }) => {
  return (
    <>
      {user ? (
        <div className='md:w-1/2 lg:w-1/3 flex items-center py-10 px-5 font-medium whitespace-nowrap hover:text-indigo-800 text-white hover:bg-gray-300 cursor-pointer rounded-xl'>
          <a href={`user/${user.id}`}>
            <Tooltip
              style={{ opacity: '0' }}
              trigger='hover'
              content={<UserPopOver user={user} />}
              arrow={false}>
              <div className='flex items-center font-medium whitespace-nowrap'>
                <img
                  className='w-20 h-20 rounded-full'
                  crossOrigin='anonymous'
                  src={user.profilePicture}
                />
                <div className='pl-3'>
                  <div className='text-base font-bold'>{user.login}</div>
                  <div className='text-base font-bold'>{user.fullName}</div>
                  <div className='font-normal'>{user.email}</div>
                </div>
              </div>
            </Tooltip>
          </a>
        </div>
      ) : (
        <CardLoader />
      )}
    </>
  );
};

export default UserCard;
