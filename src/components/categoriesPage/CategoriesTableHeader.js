import { Dropdown } from 'flowbite-react';
import {
  HiSortAscending,
  HiSortDescending,
  HiSearch,
  HiDocumentText,
} from 'react-icons/hi';
import { arraySort } from '../../utils/categories.utils';

const CategoriesTableHeader = ({
  sort,
  setSort,
  categories,
  allCategories,
  setAllCategories,
}) => {
  const startSearch = (search) => {
    setAllCategories(
      allCategories.filter((category) => {
        return (
          category.title.toLowerCase().includes(search.toLowerCase())
          || category.description.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  };

  const onSearch = (event) => {
    if (event.target.value.length) startSearch(event.target.value);
    else {
      setAllCategories(categories);
    }
  };

  const sortBy = (param) => {
    const newSort = {
      param,
      ascending: sort.param === param ? !sort.ascending : false,
    };
    setSort(newSort);
    const sorted = arraySort(allCategories, newSort);
    setAllCategories(sorted);
  };

  return (
    <div className='md:flex justify-between items-center p-4 border-5 border-white rounded-b-lg bg-gray-900'>
      <span className='text-3xl font-bold text-gray-500'>All Categories</span>
      <Dropdown size='sm' arrowIcon={false}
        label={
          <>
            <span className='mr-4'>
              {sort.param.charAt(0).toUpperCase() + sort.param.slice(1)}
            </span>
            {sort.ascending ? (<HiSortAscending size={25} />) : (<HiSortDescending size={25} />)}
          </>
        }>
        <Dropdown.Item
          onClick={() => { sortBy('postsCount'); }}
          icon={HiDocumentText}>
          Post Count
        </Dropdown.Item>
      </Dropdown>
      <div>
        <label htmlFor='table-search' className='sr-only'>
          Search
        </label>
        <div className='relative m-1'>
          <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
            <HiSearch color='white' size={20} />
          </div>
          <input
            type='text'
            onChange={onSearch}
            id='table-search-categories'
            className='block p-2 pl-10 w-60 text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
            placeholder='Search for categories'
          />
        </div>
      </div>
    </div>
  );
};

export default CategoriesTableHeader;
