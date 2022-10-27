/* eslint-disable arrow-body-style */
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PostCreationForm from '../components/postCreationPage/postCreationForm';
import PostCreationHeader from '../components/postCreationPage/PostCreationHeader';

const PostCreationPage = () => {
  const { postId } = useParams();
  const { posts } = useSelector((state) => {
    return state.posts;
  });
  const getPost = () => (postId ? posts.filter((post) => post.id === postId)[0] : null);
  return (
    <div className='flex flex-col lg:flex-row-reverse'>
      <PostCreationHeader />
      <PostCreationForm post={getPost} />
    </div>
  );
};

export default PostCreationPage;
