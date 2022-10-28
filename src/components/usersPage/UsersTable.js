/* eslint-disable operator-linebreak */
import { Pagination } from 'flowbite-react';
import { useEffect, useState } from 'react';
import UserCard from './UserCard';
import config from '../../config';
import UsersTableHeader from './UsersTableHeader';

const { USERS_COUNT } = config;

const sliceUsers = (array, currentPage) => {
  return array.slice(
    (currentPage - 1) * USERS_COUNT,
    (currentPage - 1) * USERS_COUNT + USERS_COUNT
  );
};

const UsersTable = ({ users }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allUsers, setAllUsers] = useState(
    [...users].sort((a, b) => {
      return b.rating - a.rating;
    })
  );
  const [currentUsers, setCurrentUsers] = useState(
    sliceUsers(allUsers, currentPage)
  );
  const loadUsers = (page) => {
    setCurrentPage(page);
    setCurrentUsers(sliceUsers(allUsers, currentPage));
  };

  useEffect(() => {
    loadUsers(currentPage);
  }, [allUsers]);

  return (
    <>
      <div className='h-full w-full'>
        <UsersTableHeader
          allUsers={allUsers}
          setAllUsers={setAllUsers}
          setCurrentUsers={setCurrentUsers}
          users={users}
        />
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
          totalPages={Math.ceil(allUsers.length / USERS_COUNT)}
          onPageChange={loadUsers}
        />
      </div>
    </>
  );
};

export default UsersTable;
