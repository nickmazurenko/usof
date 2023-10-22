import { Dropdown } from 'flowbite-react';
import {
  HiCalculator,
  HiSortAscending,
  HiSortDescending,
  HiThumbUp,
  HiChat,
  HiEye,
} from 'react-icons/hi';
import { useSearchParams } from 'react-router-dom';

import { arraySort } from '../../utils/posts.utils';

const SortDropdown = ({ allPosts, setAllPosts }) => {
  const [params, setParams] = useSearchParams();
  const sortBy = (param) => {
    const newSort = {
      param,
      ascending: params.get('param') === param ? !(params.get('ascending') === 'true') : false,
    };
    params.set('param', newSort.param);
    params.set('ascending', newSort.ascending);
    setParams(params);
    const sorted = arraySort(allPosts, newSort);
    setAllPosts(sorted);
  };
  return (
    <Dropdown size='sm' arrowIcon={false}
      label={
        <>
          <span className='mr-4'>
          {params.get('param')
            ? params.get('param').charAt(0).toUpperCase()
                  + params.get('param').slice(1)
            : ''}
          </span>
          {params.get('ascending') === 'true' ? (
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
