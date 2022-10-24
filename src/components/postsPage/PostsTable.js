/* eslint-disable operator-linebreak */
import { Dropdown, Pagination } from 'flowbite-react';
import { useEffect, useState } from 'react';
import {
  HiChat,
  HiDocumentText,
  HiEye,
  HiSearch,
  HiSortAscending,
  HiSortDescending,
  HiUser,
} from 'react-icons/hi';
import PostCard from './PostCard';

const itemsCount = 5;

const PostsTable = ({ posts }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState({ param: 'likesCount', ascending: false });
  const [allPosts, setAllPosts] = useState(posts);
  const [currentPosts, setCurrentPosts] = useState(
    allPosts.slice(
      (currentPage - 1) * itemsCount,
      (currentPage - 1) * itemsCount + itemsCount
    )
  );

  const sortBy = (param) => {
    // eslint-disable-next-line prefer-const
    const newSort = {
      param,
      ascending: sort.param === param ? !sort.ascending : false,
    };
    setSort(newSort);
    const sorted = [...allPosts].sort((a, b) => {
      if (newSort.param === 'date') {
        return newSort.ascending
          ? new Date(b.createdAt) - new Date(a.createdAt)
          : new Date(a.createdAt) - new Date(b.createdAt);
      }
      return newSort.ascending
        ? a[newSort.param] - b[newSort.param]
        : b[newSort.param] - a[newSort.param];
    });
    setAllPosts(sorted);
  };

  const startSearch = (search) => {
    setCurrentPosts(
      allPosts.filter((post) => {
        return (
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.content.toLowerCase().includes(search.toLowerCase()) ||
          post.login.toLowerCase().includes(search.toLowerCase())
        );
      })
    );
  };

  const loadUsers = (page) => {
    setCurrentPage(page);
    setCurrentPosts(
      allPosts.slice(
        (page - 1) * itemsCount,
        (page - 1) * itemsCount + itemsCount
      )
    );
  };

  useEffect(() => {
    loadUsers(currentPage);
  }, [allPosts]);

  return (
    <>
      <div className='h-full w-full'>
        <div className='flex justify-between items-center p-4 border-5 border-white rounded-b-lg bg-gray-900'>
          <Dropdown
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
                sortBy('commentsCount');
              }}
              icon={HiChat}>
              Comments
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                sortBy('views');
              }}
              icon={HiEye}>
              Views
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                sortBy('date');
              }}
              icon={HiDocumentText}>
              Date
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                sortBy('likesCount');
              }}
              icon={HiUser}>
              Likes
            </Dropdown.Item>
          </Dropdown>
          <label htmlFor='table-search' className='sr-only'>
            Search
          </label>
          <div className='relative'>
            <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
              <HiSearch color='white' size={20} />
            </div>
            <input
              type='text'
              onChange={(e) => {
                if (e.target.value.length) startSearch(e.target.value);
                else {
                  setCurrentPosts(
                    allPosts.slice(
                      (currentPage - 1) * itemsCount,
                      (currentPage - 1) * itemsCount + itemsCount
                    )
                  );
                }
              }}
              id='table-search-posts'
              className='block p-2 pl-10 w-60 text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
              placeholder='Search for posts'
            />
          </div>
        </div>
        <div className='flex mx-5 items-center flex-wrap'>
          {currentPosts.length ? (
            currentPosts.map((post) => {
              return <PostCard key={post.id} post={post} />;
            })
          ) : (
            <div className='flex h-full items-center py-10 px-5 font-medium whitespace-nowrap text-gray-300'>
              <p className='text-4xl text-center'>No such posts</p>
            </div>
          )}
        </div>
      </div>
      <div className='flex items-center justify-center py-10 sm:px-6 lg:px-8'>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(allPosts.length / itemsCount)}
          onPageChange={loadUsers}
        />
      </div>
    </>
  );
};

export default PostsTable;
