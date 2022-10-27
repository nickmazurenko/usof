/* eslint-disable arrow-body-style */
import { Textarea, Button } from 'flowbite-react';
import { HiEye, HiCode } from 'react-icons/hi';
import { useState } from 'react';
import Markdown from 'react-markdown';

const ContentCard = ({ onChange, value, step, setStep }) => {
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const check = () => {
    if (value.length < 20) {
      setError('Content length should be at least 20 characters long');
    } else if (value.length > 1000) {
      setError('Content length should less then 1000 characters');
    } else {
      setStep('categories');
    }
    setTimeout(() => setError(''), 3000);
  };

  return (
    <div
      className={`flex flex-col space-y-2 p-4 rounded-md bg-gray-900 ${
        step !== 'content' && step !== 'categories' ? 'blur-sm' : ''
      }`}>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <span className='text-md text-gray-300'>What are the details?</span>
          <span className='text-xs text-gray-500'>
            Introduce the problem and expand on what you put in the title.
            Minimum 20 characters.
          </span>
        </div>
        <div className='flex flex-row'>
          <Button
            color={showPreview ? 'dark' : 'light'}
            onClick={() => setShowPreview(false)}
            size='sm'>
            {<HiCode />}
          </Button>
          <Button
            color={showPreview ? 'light' : 'dark'}
            onClick={() => setShowPreview(true)}
            size='sm'>
            {<HiEye />}
          </Button>
        </div>
      </div>
      {showPreview ? (
        <div className='text-white whitespace-pre p-4 border-2 shadow-md shadow-black border-indigo-800 rounded-xl'>
          <Markdown>{value}</Markdown>
        </div>
      ) : (
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
      )}

      {step === 'content' ? (
        <div className='w-1/5'>
          <Button
            onClick={check}
            disabled={step !== 'content' && step !== 'categories'}>
            Next
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default ContentCard;
