import { Dropdown } from 'flowbite-react';
import {
  HiSortAscending,
  HiSortDescending,
  HiThumbUp,
  HiCalendar,
} from 'react-icons/hi';

const CommentSectionDropdown = ({ sort, setSort, comments }) => {
  const sortBy = (param) => {
    const newSort = {
      param,
      ascending: sort.param === param ? !sort.ascending : false,
    };
    setSort(newSort);
  };
  return (
    <div className='flex justify-between items-center my-2 mx-2'>
      <h2 className='text-lg lg:text-2xl font-bold text-gray-900 dark:text-white'>
        Comments ({comments.length})
      </h2>
      <Dropdown
        size='sm'
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
            sortBy('date');
          }}
          icon={HiCalendar}>
          Date
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            sortBy('likesCount');
          }}
          icon={HiThumbUp}>
          Likes
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default CommentSectionDropdown;
