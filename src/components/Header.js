/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import { HiViewGrid, HiLogout, HiUser, HiHome } from 'react-icons/hi';
import { Dropdown, Navbar, Avatar } from 'flowbite-react';
import { logout } from '../features/auth/actions';

const AuthButtons = () => {
  return (
    <div className='flex items-center md:order-2'>
      <a
        href='/login'
        className='text-white focus:ring-4 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 hover:bg-gray-700 focus:outline-none focus:ring-gray-800'>
        Login
      </a>
      <a
        href='/register'
        className='text-white focus:ring-4  font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800'>
        Sign up
      </a>
      <Navbar.Toggle />
    </div>
  );
};

const UserMenu = ({ user }) => {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(logout());
  };
  const { profilePicture, email, fullName, login } = user;
  return (
    <div className='flex md:order-2'>
      <Dropdown
        arrowIcon={false}
        inline={true}
        label={
          <Avatar alt='User settings' img={profilePicture} rounded={true} />
        }>
        <Dropdown.Header>
          <span className='block text-sm'>{fullName || login}</span>
          <span className='block text-sm font-medium truncate'>{email}</span>
        </Dropdown.Header>
        <Dropdown.Item icon={HiUser}>Profile</Dropdown.Item>
        <Dropdown.Item icon={HiViewGrid}>My Posts</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={signOut} icon={HiLogout}>
          Sign out
        </Dropdown.Item>
      </Dropdown>
      <Navbar.Toggle />
    </div>
  );
};

const Header = () => {
  // eslint-disable-next-line no-unused-vars, object-curly-newline
  const { loading, error, isAuthenticated, user } = useSelector((state) => {
    return state.auth;
  });
  return (
    <Navbar fluid={true}>
      <Navbar.Brand href='/'>
        <img
          src='https://ik.imagekit.io/g39hqj8mc/logo_1__bJtQz4Zyp.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666396394021'
          className='mr-3 h-6 sm:h-10'
          alt='Use Of Logo'
        />
      </Navbar.Brand>
      {isAuthenticated ? <UserMenu user={user} /> : <AuthButtons />}
      <Navbar.Collapse>
        <Navbar.Link href='/' active={true}>
          <HiHome className='text-3xl' />
        </Navbar.Link>
        <Navbar.Link href='/posts'><span className='text-2xl'>Posts</span></Navbar.Link>
        <Navbar.Link href='/users'><span className='text-2xl'>Users</span></Navbar.Link>
        <Navbar.Link href='/ask'><span className='text-2xl'>Ask Question</span></Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
