import { Dropdown } from 'flowbite-react';
import { useState } from 'react';
import {
  HiCalculator,
  HiSortAscending,
  HiSortDescending,
  HiThumbUp,
  HiChat,
  HiEye,
} from 'react-icons/hi';

import { arraySort } from '../../utils/posts.utils';

const SortDropdown = ({ allPosts, setAllPosts }) => {
  const [sort, setSort] = useState({ param: 'likesCount', ascending: false });
  const sortBy = (param) => {
    const newSort = {
      param,
      ascending: sort.param === param ? !sort.ascending : false,
    };
    setSort(newSort);
    const sorted = arraySort(allPosts, newSort);
    setAllPosts(sorted);
  };
  return (
    <Dropdown size='sm' arrowIcon={false}
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
      <Dropdown.Item onClick={() => { sortBy('commentsCount'); }} icon={HiChat}> Comments </Dropdown.Item>
      <Dropdown.Item onClick={() => { sortBy('views'); }} icon={HiEye}> Views </Dropdown.Item>
      <Dropdown.Item onClick={() => { sortBy('date'); }} icon={HiCalculator}> Date </Dropdown.Item>
      <Dropdown.Item onClick={() => { sortBy('likesCount'); }} icon={HiThumbUp}> Likes </Dropdown.Item>
    </Dropdown>
  );
};

export default SortDropdown;
