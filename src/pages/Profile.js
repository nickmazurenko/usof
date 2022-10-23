import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ProfileComponent from '../components/Profile';
import CardLoader from '../components/CardLoader';
import { loadCurrentUser } from '../features/auth/actions';

const ProfilePage = () => {
  const { user, loading } = useSelector((state) => {
    return state.auth;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCurrentUser());
  }, [dispatch]);
  return loading ? (
    <CardLoader />
  ) : (
    <ProfileComponent user={user} loading={loading} />
  );
};

export default ProfilePage;
