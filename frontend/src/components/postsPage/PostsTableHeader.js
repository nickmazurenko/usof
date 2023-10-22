import { useParams, useNavigate } from 'react-router-dom';
import { HiDocumentText, HiSearch } from 'react-icons/hi';
import { Button } from 'flowbite-react';
import UserCard from '../usersPage/UserCard';
import SortDropdown from './SortDropdown';
import FilterDropdown from './FilterDropdown';

const PostsTableHeader = ({ allPosts, setAllPosts, posts, category, user }) => {
  const params = useParams();
  const navigate = useNavigate();
  const startSearch = (search) => {
    setAllPosts(
      allPosts.filter((post) => {
        return (
          post.title.toLowerCase().includes(search.toLowerCase())
          || post.content.toLowerCase().includes(search.toLowerCase())
          || (post.login
            && post.login.toLowerCase().includes(search.toLowerCase()))
        );
      })
    );
  };

  const getElement = () => {
    if (params.categoryId) {
      return (
        <div className='flex flex-col space-y-2'>
          <span className='text-3xl font-bold text-gray-500'>
            {category.title}
          </span>
          <p className='text-gray-400'>{category.description}</p>
          <div className='flex cursor-pointer items-center text-gray-400 transition hover:text-slate-600'>
            <HiDocumentText size={35} />
            <span className='ml-2 text-xl'>{category.postsCount}</span>
          </div>
        </div>
      );
    }
    if (params.userId) {
      return <UserCard user={user} />;
    }
    return <span className='text-3xl font-bold text-gray-500'>All Posts</span>;
  };
  return (
    <>
      <div className='flex flex-wrap bg-gray-900 p-5 justify-between items-center'>
        {getElement()}
        <div className='w-1/6'>
          {params.categoryId || params.userId ? null : (
            <Button onClick={() => { navigate('/posts/create'); }}>Create...</Button>
          )}
        </div>
      </div>
      <div className='md:flex justify-between items-center p-4 border-5 border-white rounded-b-lg bg-gray-900'>
        <div className='flex w-full space-x-2'>
          <SortDropdown allPosts={allPosts} setAllPosts={setAllPosts} />
          <FilterDropdown allPosts={allPosts} setAllPosts={setAllPosts} />
        </div>
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
                  setAllPosts(posts);
                }
              }}
              id='table-search-posts'
              className='block p-2 pl-10 w-60 text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
              placeholder='Search for posts'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PostsTableHeader;
