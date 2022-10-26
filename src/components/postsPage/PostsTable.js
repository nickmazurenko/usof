/* eslint-disable operator-linebreak */
import { Button, Dropdown, Pagination } from 'flowbite-react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  HiChat,
  HiDocumentText,
  HiEye,
  HiFilter,
  HiSearch,
  HiSortAscending,
  HiSortDescending,
  HiUser,
  HiOutlineCalendar,
} from 'react-icons/hi';
import PostCard from './PostCard';
import config from '../../config';
import UserCard from '../usersPage/UserCard';

const itemsCount = config.POSTS_COUNT;

const arraySort = (array, sort) => {
  return [...array].sort((a, b) => {
    if (sort.param === 'date') {
      return sort.ascending
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    }
    return sort.ascending
      ? a[sort.param] - b[sort.param]
      : b[sort.param] - a[sort.param];
  });
};

const arrayFilter = (array, filter) => {
  return [...array].filter((a) => {
    if (filter === 'All time') return a;
    return moment().isSame(moment(a.createdAt), filter.toLowerCase());
  });
};

const slicePages = (array, currentPage) => {
  return array.slice(
    (currentPage - 1) * itemsCount,
    (currentPage - 1) * itemsCount + itemsCount
  );
};

const PostsTable = ({ posts, category, user }) => {
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState({ param: 'likesCount', ascending: false });
  const [filter, setFilter] = useState('All time');
  const [allPosts, setAllPosts] = useState(posts);
  const [currentPosts, setCurrentPosts] = useState(
    slicePages(allPosts, currentPage)
  );
  const startFilter = (param) => {
    setFilter(param);
    setAllPosts(arrayFilter(allPosts, param));
  };
  const sortBy = (param) => {
    const newSort = {
      param,
      ascending: sort.param === param ? !sort.ascending : false,
    };
    setSort(newSort);
    const sorted = arraySort(allPosts, newSort);
    setAllPosts(sorted);
  };

  const startSearch = (search) => {
    setAllPosts(
      allPosts.filter((post) => {
        return (
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.content.toLowerCase().includes(search.toLowerCase()) ||
          (post.login &&
            post.login.toLowerCase().includes(search.toLowerCase()))
        );
      })
    );
  };

  const loadPosts = (page) => {
    setCurrentPage(page);
    setCurrentPosts(slicePages(allPosts, page));
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

  useEffect(() => {
    loadPosts(currentPage);
  }, [allPosts]);

  return (
    <>
      <div className='h-full w-full'>
        <div className='flex flex-wrap bg-gray-900 p-5 justify-between items-center'>
          {getElement()}
          <div className='w-1/6'>
            {params.categoryId || params.userId ? null : (
              <Button>Create...</Button>
            )}
          </div>
        </div>
        <div className='md:flex justify-between items-center p-4 border-5 border-white rounded-b-lg bg-gray-900'>
          <div className='flex w-full space-x-2'>
            <Dropdown
              size='sm'
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

            <Dropdown
              size='sm'
              arrowIcon={false}
              label={
                <>
                  <span className='mr-4'>{filter}</span>
                  <HiFilter size={25} />
                </>
              }>
              <Dropdown.Item
                onClick={() => {
                  startFilter('All time');
                }}
                icon={HiOutlineCalendar}>
                All time
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  startFilter('Day');
                }}
                icon={HiOutlineCalendar}>
                Day
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  startFilter('Month');
                }}
                icon={HiOutlineCalendar}>
                Month
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  startFilter('Year');
                }}
                icon={HiOutlineCalendar}>
                Year
              </Dropdown.Item>
            </Dropdown>
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
                    setAllPosts(posts());
                  }
                }}
                id='table-search-posts'
                className='block p-2 pl-10 w-60 text-sm rounded-lg border bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                placeholder='Search for posts'
              />
            </div>
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
          onPageChange={loadPosts}
        />
      </div>
    </>
  );
};

export default PostsTable;
