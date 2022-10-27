/* eslint-disable arrow-body-style */
import { TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import Category from '../postsPage/Category';

const CategoriesCard = ({ onChange, value, step }) => {
  const [error, setError] = useState('');

  const check = () => {
    const categories = value.split(',').map((category) => category.trim());
    if (categories.length < 2) {
      setError('There should be at least two categories');
    } else if (new Set(categories).size !== categories.length) {
      setError('There should be no categories duplicates');
    } else {
      setError('');
    }
  };

  useEffect(() => {
    if (step === 'categories') check();
  }, [value, step]);

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
      <div className='flex flex-wrap text-white'>
        {value.split(',').map((categoryTitle) => (
          <Category key={categoryTitle} category={{ categoryTitle }} />
        ))}
      </div>
      <TextInput
        helperText={<span className='text-red-600'>{error}</span>}
        name='categories'
        disabled={step !== 'categories'}
        max='10'
        value={value}
        onChange={onChange}
        sizing='sm'
        placeholder='e.g JS, React, Tailwind'
      />
    </div>
  );
};

export default CategoriesCard;
