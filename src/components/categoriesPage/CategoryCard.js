import { Button } from 'flowbite-react';
import { HiDocumentText } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import CardLoader from '../CardLoader';

const cutContent = (content) => {
  return content.length > 100 ? `${content.slice(0, 100)}...` : content;
};

const PostCard = ({ category }) => {
  const navigate = useNavigate();
  return (
    <>
      {category ? (
        <div className='w-full md:w-1/2 pr-1 lg:w-1/4 flex items-center mt-5'>
          <div className='w-full border bg-gray-900 rounded-xl border-gray-500 p-5 '>
            <div className='flex flex-wrap justify-between items-center border-gray-500 border-b-2 pb-3'>
              <div className='text-lg font-bold text-slate-200'>
                {category.title}
              </div>
              <div>
              <Button
                onClick={() => {
                  navigate(`/posts/category/${category.id}`);
                }}
                color='dark'>
                More info
              </Button>
              </div>
            </div>

            <div className='flex mt-4 mb-6'>
              <div className='text-md text-neutral-400 whitespace-pre-line'>
                {cutContent(category.description)}
              </div>
            </div>
            <div>
              <div className='flex flex-wrap items-center justify-between text-gray-200 font-bold text-lg'>
                <div className='flex space-x-4 md:space-x-8'>
                  <div className='flex cursor-pointer items-center transition'>
                    <HiDocumentText size={25} />
                    <span className='ml-2'>{category.postsCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <CardLoader />
      )}
    </>
  );
};

export default PostCard;
