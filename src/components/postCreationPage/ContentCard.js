/* eslint-disable arrow-body-style */
import { Textarea, Button } from 'flowbite-react';
import { useState } from 'react';

const ContentCard = ({ onChange, value, step, setStep }) => {
  const [error, setError] = useState('');

  const check = () => {
    if (value.length < 20) {
      setError('Content length should be at least 20 characters long');
      setTimeout(() => setError(''), 3000);
    } else {
      setStep('categories');
    }
  };

  return (
    <div
      className={`flex flex-col space-y-2 p-4 rounded-md bg-gray-900 ${
        step !== 'content' && step !== 'categories' ? 'blur-sm' : ''
      }`}>
      <span className='text-md text-gray-300'>What are the details?</span>
      <span className='text-xs text-gray-500'>
        Introduce the problem and expand on what you put in the title. Minimum
        20 characters.
      </span>
      <Textarea
        helperText={<span className='text-red-600'>{error}</span>}
        disabled={step !== 'content' && step !== 'categories'}
        name='content'
        onChange={onChange}
        value={value}
        placeholder='e.g. Have been looking for some best variants to find min and max values.
    Are there any with the highest efficiency?'
        rows={10}
      />
      <div className='w-1/5'>
        <Button
          onClick={check}
          disabled={step !== 'content' && step !== 'categories'}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default ContentCard;
