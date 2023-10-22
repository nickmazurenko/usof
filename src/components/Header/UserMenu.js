import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { HiUser, HiViewGrid, HiCog, HiLogout } from 'react-icons/hi';
import { Dropdown, Navbar } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { loadCurrentUser, logout } from '../../features/auth/actions';
import SettingsModal from './SettingsModal';

const UserMenu = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signOut = () => {
    dispatch(logout());
    navigate('/login');
  };
  useEffect(() => {
    dispatch(loadCurrentUser());
  }, []);
  const { profilePicture, email, fullName, login } = user;
  return (
    <div className='flex md:order-2'>
      <Dropdown
        style={{
          padding: 0,
          color: 'transparent',
        }}
        color='transparent'
        arrowIcon={false}
        inline={true}
        label={
          <img
            className='w-12 h-12 rounded-full'
            crossOrigin='anonymous'
            src={profilePicture}
            alt='user photo'
          />
        }>
        <Dropdown.Header>
          <span className='block text-sm'>{fullName || login}</span>
          <span className='block text-sm font-medium truncate'>{email}</span>
        </Dropdown.Header>
          <Dropdown.Item onClick={() => { navigate('/profile'); }} icon={HiUser}>Profile</Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            navigate(`/posts/users/${user.id}`);
          }}
          icon={HiViewGrid}>
          My Posts
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item icon={HiCog}>
          <SettingsModal user={user} />
        </Dropdown.Item>
          <Dropdown.Item onClick={signOut} icon={HiLogout}>
            Sign out
          </Dropdown.Item>
      </Dropdown>
      <Navbar.Toggle />
    </div>
  );
};

export default UserMenu;
