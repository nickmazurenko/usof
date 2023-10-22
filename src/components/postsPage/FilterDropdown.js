import { Dropdown } from 'flowbite-react';
import { HiFilter, HiOutlineCalendar } from 'react-icons/hi';
import { useSearchParams } from 'react-router-dom';
import { arrayFilter } from '../../utils/posts.utils';

const FilterDropdown = ({ allPosts, setAllPosts }) => {
  const [params, setParams] = useSearchParams();
  const startFilter = (param) => {
    params.set('filter', param);
    setParams(params);

    setAllPosts(arrayFilter(allPosts, param));
  };
  return (
    <Dropdown size='sm' arrowIcon={false}
      label={
        <>
          <span className='mr-4'>{params.get('filter')}</span>
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
