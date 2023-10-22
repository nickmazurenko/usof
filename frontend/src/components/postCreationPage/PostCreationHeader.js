import { HiPencilAlt } from 'react-icons/hi';

const PostCreationHeader = () => {
  return (
    <div className='bg-gray-900 p-5 lg:w-1/2'>
      <div className='flex flex-wrap justify-between items-center'>
        <span className='text-3xl font-bold text-gray-500'>
          Ask a question / Create a post
        </span>
      </div>
      <div className='border-2 rounded-xl my-4 text-gray-400 border-indigo-800'>
        <div className='m-5 text-lg'>
          <HiPencilAlt size='50' />
          <span className='text-2xl'> Writing a good question </span>
          <p>
            You’re ready to ask a question and this form will help guide you
            through the process.
          </p>
          <span>Steps</span>
          <ul className='list-disc marker:text-indigo-800 mx-10'>
            <li>Summarize your problem in a one-line title.</li>
            <li>Describe your problem in more detail.</li>
            <li>Describe what you tried and what you expected to happen.</li>
            <li>
              Add “tags” which help surface your question to members of the
              community.
            </li>
            <li>Review your question and post it to the site.</li>
          </ul>
          <span className='text-xl'>You can use MarkDown!</span>
        </div>
      </div>
    </div>
  );
};

export default PostCreationHeader;
