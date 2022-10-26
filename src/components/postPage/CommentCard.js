import { HiOutlineThumbUp, HiOutlineThumbDown } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Linkify from 'linkify-react';
import { useEffect, useState } from 'react';
import CardLoader from '../CardLoader';
import { addLike, getLikes, removeLike } from '../../features/comments/actions';

const getLikeColor = (votes, user) => {
  return votes.findIndex((x) => {
    return user && x.user_id === user.id;
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
  const [votesColors, setVotesColors] = useState({
    like: getLikeColor(commentLikes.likes || comment.likes, user),
    dislike: getLikeColor(commentLikes.dislikes || comment.dislikes, user),
  });

  const [votes, setVotes] = useState({
    likes:
      commentLikes.likesCount !== undefined
        ? commentLikes.likesCount
        : comment.likesCount,
    dislikes:
      commentLikes.dislikesCount !== undefined
        ? commentLikes.dislikesCount
        : comment.dislikesCount,
  });

  const onClickLike = (type) => {
    dispatch(addLike(comment.id, type));
  };

  return (
    <>
      {comment ? (
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
            <div className='flex items-end flex-col justify-between'>
              <div className='flex flex-wrap items-center justify-between text-gray-100 font-bold text-lg'>
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
        </div>
      ) : (
        <CardLoader />
      )}
    </>
  );
};

export default CommentCard;
