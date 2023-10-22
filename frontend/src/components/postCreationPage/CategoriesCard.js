/* eslint-disable no-else-return */
/* eslint-disable arrow-body-style */
import CreatableSelect from 'react-select/creatable';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../features/categories/actions';

const CategoriesCard = ({ onChange, step }) => {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const storeCategories = useSelector((state) => {
    return state.categories;
  });
  const categoriesLoading = storeCategories.loading;

  const check = (categories) => {
    if (categories.length < 2) {
      setError('There should be at least two categories');
      return false;
    } else if (new Set(categories).size !== categories.length) {
      setError('There should be no categories duplicates');
      return false;
    } else {
      setError('');
    }
  };

  const onSelectorChange = (values) => {
    if (!check(values)) {
      onChange({
        target: {
          value: values.length
            ? values.reduce((a, b) => {
              return `${a.label || a}, ${b.label}`;
            })
            : '',
          name: 'categories',
        },
      });
    }
  };

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div
      className={`flex flex-col space-y-2 p-4 rounded-md bg-gray-900 ${
        step !== 'categories' ? 'blur-sm' : ''
      }`}>
      <span className='text-md text-gray-300'>Categories</span>
      <span className='text-xs text-gray-500'>
        Add up to five categories to describe what your question or post is
        about.
      </span>
      <CreatableSelect
        theme={(theme) => ({
          ...theme,
          borderRadius: 10,
          colors: {
            ...theme.colors,
            primary25: '#111827',
            neutral0: '#374151',
            neutral80: '#FFFFFF',
            neutral10: '#6875f5',
          },
        })}
        isLoading={categoriesLoading}
        isClearable
        isSearchable
        isMulti
        name='categories'
        onChange={onSelectorChange}
        options={storeCategories.categories.map((cat) => {
          return { value: cat.title, label: cat.title };
        })}
      />
      <span className='text-red-600 text-xs'>{error}</span>
    </div>
  );
};

export default CategoriesCard;
