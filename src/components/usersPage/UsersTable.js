/* eslint-disable operator-linebreak */
import { Pagination } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  const [params, setParams] = useSearchParams();
  const [allUsers, setAllUsers] = useState(
    [...users].sort((a, b) => {
      return b.rating - a.rating;
    })
  );
  const [currentUsers, setCurrentUsers] = useState(
    sliceUsers(allUsers, params.get('page'))
  );
  const loadUsers = (page) => {
    params.set('page', page);
    setParams(params);
    setCurrentUsers(sliceUsers(allUsers, params.get('page')));
  };

  const onLoad = () => {
    if (!params.get('param')) {
      setParams({ param: 'rating', ascending: false });
    }
    const page = params.get('page');
    if (page === 'null' || page === '0') {
      params.set('page', 1);
      setParams(params);
    }
  };

  useEffect(() => {
    loadUsers(params.get('page'));
    onLoad();
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
          currentPage={Number(params.get('page'))}
          totalPages={Math.ceil(allUsers.length / USERS_COUNT)}
          onPageChange={loadUsers}
        />
      </div>
    </>
  );
};

export default UsersTable;
