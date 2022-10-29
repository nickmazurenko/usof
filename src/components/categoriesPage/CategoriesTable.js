/* eslint-disable operator-linebreak */
import { Pagination } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CategoryCard from './CategoryCard';
import CategoriesTableHeader from './CategoriesTableHeader';
import config from '../../config';
import { arraySort } from '../../utils/categories.utils';

const { CATEGORIES_COUNT } = config;

const slicePages = (array, currentPage) => {
  return array.slice(
    (currentPage - 1) * CATEGORIES_COUNT,
    (currentPage - 1) * CATEGORIES_COUNT + CATEGORIES_COUNT
  );
};

const CategoriesTable = ({ categories }) => {
  const [params, setParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [allCategories, setAllCategories] = useState(
    arraySort(categories, {
      param: params.get('param'),
      ascending: params.get('ascending') === 'true',
    })
  );
  const [currentCategories, setCurrentCategories] = useState(
    slicePages(allCategories, currentPage)
  );

  const loadCategories = (page) => {
    setCurrentPage(page);
    setCurrentCategories(slicePages(allCategories, page));
  };

  const start = () => {
    const search = params.get('search');
    setParams({ param: 'postsCount', ascending: false });

    if (search) {
      setAllCategories(
        allCategories.filter((category) => {
          return (
            category.title.toLowerCase().includes(search.toLowerCase()) ||
            category.description.toLowerCase().includes(search.toLowerCase())
          );
        })
      );
    }
  };

  useEffect(() => {
    loadCategories(currentPage);
    start();
  }, [allCategories]);

  return (
    <>
      <div className='h-full w-full'>
        <CategoriesTableHeader
          categories={categories}
          allCategories={allCategories}
          setAllCategories={setAllCategories}
        />
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
          totalPages={Math.ceil(allCategories.length / CATEGORIES_COUNT)}
          onPageChange={loadCategories}
        />
      </div>
    </>
  );
};

export default CategoriesTable;
