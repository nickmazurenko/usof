import { Dropdown } from 'flowbite-react';
import { useState } from 'react';
import { HiFilter, HiOutlineCalendar } from 'react-icons/hi';
import { arrayFilter } from '../../utils/posts.utils';

const FilterDropdown = ({ allPosts, setAllPosts }) => {
  const [filter, setFilter] = useState('All time');
  const startFilter = (param) => {
    setFilter(param);
    setAllPosts(arrayFilter(allPosts, param));
  };
  return (
    <Dropdown size='sm' arrowIcon={false}
      label={
        <>
          <span className='mr-4'>{filter}</span>
          <HiFilter size={25} />
        </>
      }>
      <Dropdown.Item onClick={() => { startFilter('All time'); }} icon={HiOutlineCalendar}> All time </Dropdown.Item>
      <Dropdown.Item onClick={() => { startFilter('Day'); }} icon={HiOutlineCalendar}> Day </Dropdown.Item>
      <Dropdown.Item onClick={() => { startFilter('Month'); }} icon={HiOutlineCalendar}> Month </Dropdown.Item>
      <Dropdown.Item onClick={() => { startFilter('Year'); }} icon={HiOutlineCalendar}> Year </Dropdown.Item>
    </Dropdown>
  );
};

export default FilterDropdown;
