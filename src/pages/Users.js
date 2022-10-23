import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { getUsers } from '../features/users/actions';
import CardLoader from '../components/CardLoader';

const UsersPage = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, error, data, usersStatus } = useSelector((state) => {
    return state.users;
  });

  console.log(usersStatus, data, loading, error);

  useEffect(() => {
    if (usersStatus !== 'full') dispatch(getUsers(currentPage));
  });

  const loadUsers = () => {
    setCurrentPage(currentPage + 1);
    dispatch(getUsers(currentPage + 1));
  };
  return (
    <>
      {loading ? (
        <CardLoader />
      ) : (
        <Pagination
          currentPage={currentPage}
          totalPages={data.totalPages}
          onPageChange={loadUsers}
        />
      )}
    </>
  );
};

export default UsersPage;
