import { useSelector } from 'react-redux';
import ProfileComponent from '../components/Profile';

const ProfilePage = () => {
  const { user } = useSelector((state) => {
    return state.auth;
  });
  return <ProfileComponent user={user} />;
};

export default ProfilePage;
