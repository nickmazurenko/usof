import { useState } from 'react';
import { Dropdown } from 'flowbite-react';
import {
  HiSortAscending,
  HiSortDescending,
  HiThumbUp,
  HiEye,
  HiDocumentText,
  HiUser,
} from 'react-icons/hi';

const SortDropdown = ({ allUsers, setAllUsers }) => {
  const [sort, setSort] = useState({ param: 'rating', ascending: false });
  const sortBy = (param) => {
    const newSort = {
      param,
      ascending: sort.param === param ? !sort.ascending : false,
    };
    setSort(newSort);
    const sorted = [...allUsers].sort((a, b) => {
      return newSort.ascending
        ? a[newSort.param] - b[newSort.param]
        : b[newSort.param] - a[newSort.param];
    });
    setAllUsers(sorted);
  };
  return (
    <Dropdown
      arrowIcon={false}
      label={
        <>
          <span className='mr-4'>
            {sort.param.charAt(0).toUpperCase() + sort.param.slice(1)}
          </span>
          {sort.ascending ? (
            <HiSortAscending size={25} />
          ) : (
            <HiSortDescending size={25} />
          )}
        </>
      }>
      <Dropdown.Item
        onClick={() => {
          sortBy('rating');
        }}
        icon={HiThumbUp}>
        <span className='text-white'>Rating</span>
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => {
          sortBy('views');
        }}
        icon={HiEye}>
        Views
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => {
          sortBy('postsCount');
        }}
        icon={HiDocumentText}>
        Post Count
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => {
          sortBy('role');
        }}
        icon={HiUser}>
        Admins
      </Dropdown.Item>
    </Dropdown>
  );
};

export default SortDropdown;
