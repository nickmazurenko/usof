import { useSelector } from 'react-redux';
import ProfileComponent from '../components/Profile';
import CardLoader from '../components/CardLoader';

const ProfilePage = () => {
  const { user, loading } = useSelector((state) => {
    return state.auth;
  });
  return loading ? (
    <CardLoader />
  ) : (
    <ProfileComponent user={user} loading={loading} />
  );
};

export default ProfilePage;
