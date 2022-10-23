import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { getUsers } from '../features/users/actions';
import CardLoader from '../components/CardLoader';
import UsersTable from '../components/usersPage/UsersTable';

const UsersPage = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, data, usersStatus } = useSelector((state) => {
    return state.users;
  });

  console.log(usersStatus, data, loading, error);

  useEffect(() => {
    dispatch(getUsers(currentPage));
  }, [dispatch]);

  const loadUsers = (page) => {
    setCurrentPage(page);
    dispatch(getUsers(page));
  };
  return (
    <>
      {loading ? (
        <CardLoader />
      ) : (
        <div>
          <UsersTable users={data.users} loading={loading} />
          <div className='flex items-center justify-center py-10 sm:px-6 lg:px-8'>
            <Pagination
              currentPage={currentPage}
              totalPages={data.totalPages}
              onPageChange={loadUsers}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default UsersPage;
