/* eslint-disable operator-linebreak */
import { Dropdown, Pagination } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiDocumentText, HiEye, HiThumbUp, HiUser } from 'react-icons/hi';
import UserCard from './UserCard';

const itemsCount = 10;

const UsersTable = ({ users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allUsers, setAllUsers] = useState(
    [...users].sort((a, b) => {
      return b.rating - a.rating;
    })
  );
  const [currentUsers, setCurrentUsers] = useState(
    allUsers.slice(
      (currentPage - 1) * itemsCount,
      (currentPage - 1) * itemsCount + itemsCount
    )
  );

  const startSearch = (search) => {
    setCurrentUsers(
      allUsers.filter((user) => {
        return (
          user.fullName.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase()) ||
          user.login.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  };

  const loadUsers = (page) => {
    setCurrentPage(page);
    setCurrentUsers(
      allUsers.slice(
        (page - 1) * itemsCount,
        (page - 1) * itemsCount + itemsCount
      )
    );
  };

  const sortBy = (value) => {
    // eslint-disable-next-line prefer-const
    const sorted = [...allUsers].sort((a, b) => {
      return b[value] - a[value];
    });
    setAllUsers(sorted);
  };

  useEffect(() => {
    loadUsers(currentPage);
  }, [allUsers]);

  return (
    <>
      <div className='h-full w-full'>
        <div className='flex justify-between items-center p-4 border-5 border-white rounded-b-lg bg-gray-900'>
          <Dropdown label='Sort'>
            <Dropdown.Item
              onClick={() => {
                sortBy('rating');
              }}
              icon={HiThumbUp}>
              <span className='text-white font-bold'>Rating</span>
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                sortBy('views');
              }}
              icon={HiEye}>
              Views
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                sortBy('postsCount');
              }}
              icon={HiDocumentText}>
              Post Count
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                sortBy('role');
              }}
              icon={HiUser}>
              Admins
            </Dropdown.Item>
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
                if (e.target.value.length) startSearch(e.target.value);
                else {
                  setCurrentUsers(
                    allUsers.slice(
                      (currentPage - 1) * itemsCount,
                      (currentPage - 1) * itemsCount + itemsCount
                    )
                  );
                }
              }}
              id='table-search-users'
              className='block p-2 pl-10 w-60 text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
              placeholder='Search for users'
            />
          </div>
        </div>
        <div className='flex items-center flex-wrap'>
          {currentUsers.length ? (
            currentUsers.map((user) => {
              return <UserCard key={user.id} user={user} />;
            })
          ) : (
            <div className='flex h-full items-center py-10 px-5 font-medium whitespace-nowrap text-gray-300'>
              <p className='text-4xl text-center'>No such users</p>
            </div>
          )}
        </div>
      </div>
      <div className='flex items-center justify-center py-10 sm:px-6 lg:px-8'>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(allUsers.length / itemsCount)}
          onPageChange={loadUsers}
        />
      </div>
    </>
  );
};

export default UsersTable;
