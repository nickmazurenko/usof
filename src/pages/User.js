import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProfileComponent from '../components/Profile';
import CardLoader from '../components/CardLoader';
import { getUser } from '../features/users/actions';

const UserPage = (props) => {
  const dispatch = useDispatch();
  const { state } = useLocation();
  useEffect(() => {
    dispatch(getUser(state.id));
  }, [dispatch]);
  const { user, loading } = useSelector((storeState) => {
    return storeState.users;
  });
  return loading || !user ? (
    <CardLoader />
  ) : (
    <ProfileComponent user={user} loading={loading} />
  );
};

export default UserPage;
