import { Dropdown } from 'flowbite-react';
import {
  HiSortAscending,
  HiSortDescending,
  HiThumbUp,
  HiEye,
  HiDocumentText,
  HiUser,
} from 'react-icons/hi';
import { useSearchParams } from 'react-router-dom';

const SortDropdown = ({ allUsers, setAllUsers }) => {
  const [params, setParams] = useSearchParams();
  const sortBy = (param) => {
    const newSort = {
      param,
      ascending:
        params.get('param') === param
          ? !(params.get('ascending') === 'true')
          : false,
    };
    setParams(newSort);
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
