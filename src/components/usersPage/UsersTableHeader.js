import { HiSearch } from 'react-icons/hi';
import SortDropdown from './SortDropdown';

const UsersTableHeader = ({
  users,
  allUsers,
  setAllUsers,
  setCurrentUsers,
}) => {
  const startSearch = (search) => {
    setCurrentUsers(
      allUsers.filter((user) => {
        return (
          user.fullName.toLowerCase().includes(search.toLowerCase())
          || user.email.toLowerCase().includes(search.toLowerCase())
          || user.login.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  };
  return (
    <div className='flex justify-between items-center p-4 border-5 border-white rounded-b-lg bg-gray-900'>
      <label htmlFor='table-search' className='sr-only'>
        Search
      </label>
      <SortDropdown allUsers={allUsers} setAllUsers={setAllUsers} />
      <div className='relative'>
        <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
          <HiSearch color='white' size={20} />
        </div>
        <input
          type='text'
          onChange={(e) => {
            if (e.target.value.length) startSearch(e.target.value);
            else {
              setAllUsers(users);
            }
          }}
          id='table-search-users'
          className='block p-2 pl-10 w-60 text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
          placeholder='Search for users'
        />
      </div>
    </div>
  );
};

export default UsersTableHeader;
