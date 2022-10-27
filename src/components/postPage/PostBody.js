/* eslint-disable indent */
import { HiOutlineThumbUp, HiOutlineThumbDown, HiEye } from 'react-icons/hi';
import moment from 'moment';
import Linkify from 'linkify-react';
import Markdown from 'react-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Button } from 'flowbite-react';
import Category from '../postsPage/Category';
import { addLike, removeLike } from '../../features/posts/actions';

const getLikeColor = (votes, user) => {
  return votes.findIndex((x) => {
    return user && x.userId === user.id;
  }) > -1
    ? 'red'
    : '';
};

const PostBody = ({ post }) => {
  const dispatch = useDispatch();
  const {
    posts: { postLikes },
    auth: { user },
  } = useSelector((state) => {
    return state;
  });

  const [votesColors] = useState({
    like: getLikeColor(
      postLikes.likes && postLikes.postId === post.id
        ? postLikes.likes
        : post.likes,
      user,
      post
    ),
    dislike: getLikeColor(
      postLikes.likes && postLikes.postId === post.id
        ? postLikes.dislikes
        : post.dislikes,
      user,
      post
    ),
  });

  const [votes] = useState({
    likes:
      postLikes.likesCount !== undefined && postLikes.postId === post.id
        ? postLikes.likesCount
        : post.likesCount,
    dislikes:
      postLikes.dislikesCount !== undefined && postLikes.postId === post.id
        ? postLikes.dislikesCount
        : post.dislikesCount,
  });

  const onClickLike = (type) => {
    if (votesColors[type] === 'red') dispatch(removeLike(post.id));
    else dispatch(addLike(post.id, type));
  };

  return (
    <div className='w-full flex items-center mt-5 rounded-xl bg-gray-900'>
      <div className='w-full rounded-xl border p-5 '>
        <div className='flex w-full items-center flex-wrap justify-between border-b pb-3'>
          <a href={`/user/${post.userId}`}>
            <div className='cursor-pointer flex items-center space-x-3'>
              <img
                className='h-8 w-8 rounded-full bg-slate-400'
                crossOrigin='anonymous'
                src={post.profilePicture}
              />
              <div className='text-lg font-bold text-gray-300'>
                {post.login}
              </div>
            </div>
          </a>
          <div className='flex items-center my-2 space-x-2'>
            <div className='text-xs flex-none text-gray-100'>
              <span className='font-semibold text-white m'>Asked</span>{' '}
              {moment(post.createdAt).fromNow()}
            </div>
            <div className='text-xs flex-none text-gray-100'>
              <span className='font-semibold text-white m'>Modified</span>{' '}
              {moment(post.updatedAt).fromNow()}
            </div>
          </div>
        </div>

        <div className='flex flex-col mt-4 mb-6'>
          <div className='mb-3 text-xl font-bold text-white'>{post.title}</div>
          <div className='text-sm text-gray-100'>
            <Markdown>{post.postContent}</Markdown>
          </div>
        </div>
        <div className='flex items-end flex-col justify-between'>
          <div className='flex w-2/3 flex-wrap items-end justify-end text-white mb-5'>
            {post.categories.length
              ? post.categories.map((category) => {
                  return <Category key={category.id} category={category} />;
                })
              : null}
          </div>

          <div>
            <div className='flex flex-wrap items-center justify-between text-gray-100 font-bold text-lg'>
              <div className='flex space-x-4 md:space-x-8 mx-5'>
                {user.id === post.userId ? (
                  <a href={`/posts/update/${post.id}`}>
                    <Button>Edit</Button>{' '}
                  </a>
                ) : null}

                <div
                  onClick={() => {
                    return onClickLike('like');
                  }}
                  className='flex cursor-pointer items-center transition hover:text-slate-600'>
                  <HiOutlineThumbUp color={votesColors.like} size={25} />
                  <span className='ml-2'>{votes.likes}</span>
                </div>
                <div
                  onClick={() => {
                    return onClickLike('dislike');
                  }}
                  className='flex cursor-pointer items-center transition hover:text-slate-600'>
                  <HiOutlineThumbDown color={votesColors.dislike} size={25} />
                  <span className='ml-2'>{votes.dislikes}</span>
                </div>
                <div className='flex cursor-pointer items-center'>
                  <HiEye size={25} />
                  <span className='ml-2'>{post.views}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostBody;
