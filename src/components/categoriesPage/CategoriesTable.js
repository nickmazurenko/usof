/* eslint-disable operator-linebreak */
import { Pagination, Dropdown, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import {
  HiSearch,
  HiSortAscending,
  HiSortDescending,
  HiDocumentText,
} from 'react-icons/hi';
import CategoryCard from './CategoryCard';
import config from '../../config';
import CardLoader from '../CardLoader';

const itemsCount = config.CATEGORIES_COUNT;

const slicePages = (array, currentPage) => {
  return array.slice(
    (currentPage - 1) * itemsCount,
    (currentPage - 1) * itemsCount + itemsCount
  );
};

const arraySort = (array, sort) => {
  return [...array].sort((a, b) => {
    return sort.ascending
      ? a[sort.param] - b[sort.param]
      : b[sort.param] - a[sort.param];
  });
};

const CategoriesTable = ({ categories, loading }) => {
  const [sort, setSort] = useState({ param: 'postsCount', ascending: false });
  const [currentPage, setCurrentPage] = useState(1);
  const [allCategories, setAllCategories] = useState(
    arraySort(categories, sort)
  );
  const [currentCategories, setCurrentCategories] = useState(
    slicePages(allCategories, currentPage)
  );

  const sortBy = (param) => {
    const newSort = {
      param,
      ascending: sort.param === param ? !sort.ascending : false,
    };
    setSort(newSort);
    const sorted = arraySort(allCategories, newSort);
    setAllCategories(sorted);
  };
  const startSearch = (search) => {
    setAllCategories(
      allCategories.filter((category) => {
        return (
          category.title.toLowerCase().includes(search.toLowerCase()) ||
          category.description.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  };

  const loadCategories = (page) => {
    setCurrentPage(page);
    setCurrentCategories(slicePages(allCategories, page));
  };

  useEffect(() => {
    loadCategories(currentPage);
  }, [allCategories]);

  return (
    <>
      <div className='h-full w-full'>
        <div className='md:flex justify-between items-center p-4 border-5 border-white rounded-b-lg bg-gray-900'>
          <span className='text-3xl font-bold text-gray-500'>
            All Categories
          </span>
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
                sortBy('postsCount');
              }}
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
                onChange={(e) => {
                  if (e.target.value.length) startSearch(e.target.value);
                  else {
                    setAllCategories(categories());
                  }
                }}
                id='table-search-categories'
                className='block p-2 pl-10 w-60 text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                placeholder='Search for categories'
              />
            </div>
          </div>
        </div>
        <div className='flex mx-2 items-center flex-wrap'>
          {currentCategories.length ? (
            currentCategories.map((category) => {
              return <CategoryCard key={category.title} category={category} />;
            })
          ) : (
            <div className='flex h-full items-center py-10 px-5 font-medium whitespace-nowrap text-gray-300'>
              <p className='text-4xl text-center'>No such categories</p>
            </div>
          )}
        </div>
      </div>
      <div className='flex items-center justify-center py-10 sm:px-6 lg:px-8'>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(allCategories.length / itemsCount)}
          onPageChange={loadCategories}
        />
      </div>
    </>
  );
};

export default CategoriesTable;
