/* eslint-disable max-len */
import { useSelector } from 'react-redux';

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
      <button
        data-collapse-toggle='mobile-menu-2'
        type='button'
        className='inline-flex items-center p-2 ml-1 text-sm  rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600'
        aria-controls='mobile-menu-2'
        aria-expanded='false'>
        <span className='sr-only'>Open main menu</span>
        <svg
          className='w-6 h-6'
          aria-hidden='true'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
          data-darkreader-inline-fill=''>
          <path
            fillRule='evenodd'
            d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
            clipRule='evenodd'></path>
        </svg>
      </button>
    </div>
  );
};
const UserMenu = ({ avatar }) => {
  return (
    <div className='flex items-center md:order-2'>
      <button
        type='button'
        className='flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4  focus:ring-gray-600'
        id='user-menu-button'
        aria-expanded='false'
        data-dropdown-toggle='user-dropdown'
        data-dropdown-placement='bottom'>
        <span className='sr-only'>Open user menu</span>
        <img
          className='w-8 h-8 rounded-full'
          src={avatar}
          alt='user photo'></img>
      </button>
      <div
        className='hidden z-50 my-4 text-base list-none  rounded divide-y shadow bg-gray-700 divide-gray-600'
        id='user-dropdown'
        style={{
          position: 'absolute',
          inset: '0px auto auto 0px',
          margin: '0px',
          transform: 'translate3d(0px, 10845.6px, 0px)',
        }}
        data-popper-reference-hidden=''
        data-popper-escaped=''
        data-popper-placement='bottom'>
        <div className='py-3 px-4'>
          <span className='block text-sm text-white'>Bonnie Green</span>
          <span className='block text-sm font-medium truncate text-gray-400'>
            name@flowbite.com
          </span>
        </div>
        <ul className='py-1' aria-labelledby='user-menu-button'>
          <li>
            <a
              href='#'
              className='block py-2 px-4 text-sm  hover:bg-gray-600 text-gray-200 over:text-white'>
              Dashboard
            </a>
          </li>
          <li>
            <a
              href='#'
              className='block py-2 px-4 text-sm   hover:bg-gray-600 text-gray-200 hover:text-white'>
              Settings
            </a>
          </li>
          <li>
            <a
              href='#'
              className='block py-2 px-4 text-sm hover:bg-gray-600 text-gray-200 hover:text-white'>
              Earnings
            </a>
          </li>
          <li>
            <a
              href='#'
              className='block py-2 px-4 text-sm hover:bg-gray-600 text-gray-200 hover:text-white'>
              Sign out
            </a>
          </li>
        </ul>
      </div>
      <button
        data-collapse-toggle='mobile-menu-2'
        type='button'
        className='inline-flex items-center p-2 ml-1 text-sm  rounded-lg md:hidden  focus:outline-none focus:ring-2  text-gray-400 hover:bg-gray-700 focus:ring-gray-600'
        aria-controls='mobile-menu-2'
        aria-expanded='false'>
        <span className='sr-only'>Open main menu</span>
        <svg
          className='w-6 h-6'
          aria-hidden='true'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
          data-darkreader-inline-fill=''>
          <path
            fillRule='evenodd'
            d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
            clipRule='evenodd'></path>
        </svg>
      </button>
    </div>
  );
};

const Header = () => {
  // eslint-disable-next-line no-unused-vars, object-curly-newline
  const { loading, error, isAuthenticated, user } = useSelector((state) => {
    return state.auth;
  });
  return (
    <nav className='border-white px-2 sm:px-4 py-2.5 rounded bg-indigo-900'>
      <div className='container flex flex-wrap justify-between items-center mx-auto'>
        <a href='/' className='flex items-center'>
          <img
            src='https://ik.imagekit.io/g39hqj8mc/logo_1__bJtQz4Zyp.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666396394021'
            className='mr-3 h-6 sm:h-10'
            alt='UseOf Logo'></img>
        </a>
        {!isAuthenticated ? (
          <UserMenu avatar={user.profilePicture} />
        ) : (
          <AuthButtons />
        )}
        <div
          className='hidden justify-between items-center w-full md:flex md:w-auto md:order-1'
          id='mobile-menu-2'>
          <ul className='flex flex-col p-4 mt-4  rounded-lg border md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700'>
            <li>
              <a
                href='#'
                className='block py-2 pr-4 pl-3 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 text-white'
                aria-current='page'>
                Home
              </a>
            </li>
            <li>
              <a
                href='/posts'
                className='block py-2 pr-4 pl-3 rounded md:p-0 text-gray-400 md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700'>
                Posts
              </a>
            </li>
            <li>
              <a
                href='/'
                className='block py-2 pr-4 pl-3 rounded  md:p-0 text-gray-400 md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700'>
                Users
              </a>
            </li>
            <li>
              <a
                href='#'
                className='block py-2 pr-4 pl-3 rounded  md:p-0 text-gray-400 md:hover:text-white hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700'>
                Ask Question
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
