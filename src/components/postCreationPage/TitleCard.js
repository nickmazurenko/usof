/* eslint-disable arrow-body-style */
import { TextInput, Button } from 'flowbite-react';
import { useState } from 'react';

const TitleCard = ({ onChange, value, setStep, step }) => {
  const [error, setError] = useState('');
  const check = () => {
    if (value.length < 15) {
      setError('Title length should be at least 15 characters');
      setTimeout(() => setError(''), 3000);
    } else setStep('content');
  };
  return (
    <div className='flex flex-col space-y-2 p-4 rounded-md  bg-gray-900'>
      <span className='text-md text-gray-300'>Title</span>
      <span className='text-xs text-gray-500'>
        Be specific and imagine you’re asking a question to another person.
      </span>
      <TextInput
        helperText={<span className='text-red-600'>{error}</span>}
        name='title'
        sizing='sm'
        onChange={onChange}
        value={value}
        placeholder='e.g How to get the min. and max. values from array in JS?'
      />
      {step === 'title' ? (
        <div className='w-1/5'>
          <Button onClick={check}>Next</Button>
        </div>
      ) : null}
    </div>
  );
};

export default TitleCard;
