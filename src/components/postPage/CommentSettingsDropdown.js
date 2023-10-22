import { Dropdown } from 'flowbite-react';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from '../../features/comments/actions';

const CommentSettingsDropDown = ({ comment }) => {
  const { userId, id } = comment;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => {
    return state.auth;
  });

  const onDelete = () => {
    dispatch(deleteComment(id));
  };

  return user && user.id === userId ? (
    <Dropdown
      color='dark'
      style={{ backgroundColor: 'transparent', border: 'none' }}
      size='10'
      arrowIcon={false}
      label={<HiOutlineDotsVertical size={20} />}>
      <Dropdown.Item onClick={onDelete}>Delete</Dropdown.Item>
    </Dropdown>
  ) : null;
};

export default CommentSettingsDropDown;
