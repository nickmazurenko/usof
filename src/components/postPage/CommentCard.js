/* eslint-disable arrow-body-style */
import { HiOutlineThumbUp, HiOutlineThumbDown } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Linkify from 'linkify-react';
import { useState } from 'react';
import { Button } from 'flowbite-react';
import CardLoader from '../CardLoader';
import RepliesSection from './RepliesSection';
import { addLike, removeLike } from '../../features/comments/actions';
import CommentSettingsDropDown from './CommentSettingsDropdown';

const getLikeColor = (votes, user, comment) => {
  return votes.findIndex((x) => {
    return user && x.userId === user.id;
  }) > -1
    ? 'red'
    : '';
};

const CommentCard = ({ comment }) => {
  const dispatch = useDispatch();
  const { commentLikes } = useSelector((state) => {
    return state.comments;
  });

  const { user } = useSelector((state) => {
    return state.auth;
  });

  const [votesColors] = useState({
    like: getLikeColor(
      commentLikes.likes && commentLikes.commentId === comment.id
        ? commentLikes.likes
        : comment.likes,
      user,
      comment
    ),
    dislike: getLikeColor(
      commentLikes.dislikes && commentLikes.commentId === comment.id
        ? commentLikes.dislikes
        : comment.dislikes,
      user,
      comment
    ),
  });

  const [votes] = useState({
    likes:
      commentLikes.likesCount !== undefined
      && commentLikes.commentId === comment.id
        ? commentLikes.likesCount
        : comment.likesCount,
    dislikes:
      commentLikes.dislikesCount !== undefined
      && commentLikes.commentId === comment.id
        ? commentLikes.dislikesCount
        : comment.dislikesCount,
  });

  const onClickLike = (type) => {
    if (votesColors[type] === 'red') dispatch(removeLike(comment.id));
    else dispatch(addLike(comment.id, type));
  };

  return (
    <>
      {comment ? (
        <div className='flex flex-col'>
          <div className='w-full flex items-center mt-5 rounded-xl bg-gray-800'>
            <div className='w-full rounded-xl shadow-md p-5 '>
              <div className='flex w-full items-center flex-wrap justify-between pb-3'>
                <a href={`/user/${comment.userId}`}>
                  <div className='cursor-pointer flex items-center space-x-3'>
                    <img
                      className='h-8 w-8 rounded-full bg-slate-400'
                      crossOrigin='anonymous'
                      src={comment.profilePicture}
                    />
                    <div className='text-lg font-bold text-gray-300'>
                      {comment.login || 'deleted'}
                    </div>
                  </div>
                </a>
                <div className='flex items-center space-x-2'>
                  <div className='text-xs flex-none text-gray-500'>
                    {moment(comment.createdAt).fromNow()}
                  </div>
                  <CommentSettingsDropDown comment={comment} />
                </div>
              </div>

              <div className='flex ml-10 flex-col '>
                <div className='text-sm text-gray-400 font-medium'>
                  <Linkify
                    options={{
                      truncate: 25,
                      attributes: {
                        className:
                          'border-b border-blue-500 hover:border-none text-blue-500',
                      },
                    }}>
                    {comment.content}
                  </Linkify>
                </div>
              </div>
              <div className='flex flex-wrap items-center justify-end text-gray-100 font-bold text-lg'>
                <div className='flex space-x-4 md:space-x-8'>
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
                </div>
              </div>
            </div>
          </div>
          <RepliesSection commentId={comment.id} comments={comment.comments} />
        </div>
      ) : (
        <CardLoader />
      )}
    </>
  );
};

export default CommentCard;
