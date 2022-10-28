/* eslint-disable operator-linebreak */
import { Pagination } from 'flowbite-react';
import { useEffect, useState } from 'react';
import config from '../../config';
import PostCard from './PostCard';
import CardLoader from '../CardLoader';
import PostsTableHeader from './PostsTableHeader';

const { POSTS_COUNT } = config;

const slicePages = (array, currentPage) => {
  return array.slice(
    (currentPage - 1) * POSTS_COUNT,
    (currentPage - 1) * POSTS_COUNT + POSTS_COUNT
  );
};

const PostsTable = ({ posts, category, user, loading }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allPosts, setAllPosts] = useState(posts);
  const [currentPosts, setCurrentPosts] = useState(
    slicePages(allPosts, currentPage)
  );

  const loadPosts = (page) => {
    setCurrentPage(page);
    setCurrentPosts(slicePages(allPosts, page));
  };

  useEffect(() => {
    loadPosts(currentPage);
  }, [allPosts]);
  return (
    <>
      <div className='h-full w-full'>
        <PostsTableHeader
          allPosts={allPosts}
          setAllPosts={setAllPosts}
          posts={posts}
          category={category}
          user={user}
        />
        {loading() ? (
          <CardLoader />
        ) : (
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
        )}
      </div>
      <div className='flex items-center justify-center py-10 sm:px-6 lg:px-8'>
        <Pagination
          style={{ listStyle: 'none' }}
          currentPage={currentPage}
          totalPages={Math.ceil(allPosts.length / POSTS_COUNT)}
          onPageChange={loadPosts}
        />
      </div>
    </>
  );
};

export default PostsTable;
