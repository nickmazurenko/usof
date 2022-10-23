import { Dropdown } from 'flowbite-react';
import { useState } from 'react';
import { HiUpload } from 'react-icons/hi';

const UserCard = ({ user }) => {
  return (
    <div className='md:w-1/2 lg:w-1/3 flex items-center py-10 px-5 font-medium whitespace-nowrap text-white'>
      <img
        className='w-20 h-20 rounded-full'
        crossOrigin='anonymous'
        src={user.profilePicture}
      />
      <div className='pl-3'>
        <div className='text-base font-semibold'>{user.fullName}</div>
        <div className='font-normal text-gray-400'>{user.email}</div>
      </div>
    </div>
  );
};

const UsersTable = ({ users }) => {
  const [currentUsers, setCurrentUsers] = useState(users);
  const startSearch = (search) => {
    setCurrentUsers(users.filter((user) => {
      return (
        // eslint-disable-next-line operator-linebreak
        user.fullName.includes(search.toLowerCase()) ||
        user.email.includes(search.toLowerCase())
      );
    }));
    console.log(currentUsers);
  };

  return (
    <div className='h-full w-full'>
      <div className='flex justify-between items-center p-4 border-5 border-white rounded-b-lg bg-gray-900'>
        <Dropdown label='Actions'>
          <Dropdown.Item icon={HiUpload}>Dashboard</Dropdown.Item>
          <Dropdown.Item icon={HiUpload}>Settings</Dropdown.Item>
          <Dropdown.Item icon={HiUpload}>Earnings</Dropdown.Item>
          <Dropdown.Item icon={HiUpload}>Sign out</Dropdown.Item>
        </Dropdown>
        <label htmlFor='table-search' className='sr-only'>
          Search
        </label>
        <div className='relative'>
          <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
            <svg
              className='w-5 h-5 text-gray-500 dark:text-gray-400'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                clipRule='evenodd'></path>
            </svg>
          </div>
          <input
            type='text'
            onChange={(e) => {
              startSearch(e.target.value);
            }}
            id='table-search-users'
            className='block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Search for users'
          />
        </div>
      </div>
      <div className='flex items-center flex-wrap'>
        {currentUsers.map((user) => {
          return <UserCard key={user.id} user={user} />;
        })}
      </div>
    </div>
  );
};

export default UsersTable;
