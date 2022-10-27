import PostCreationForm from '../components/postCreationPage/postCreationForm';
import PostCreationHeader from '../components/postCreationPage/PostCreationHeader';

const PostCreationPage = () => {
  return (
    <div className='flex flex-col lg:flex-row-reverse'>
      <PostCreationHeader />
      <PostCreationForm />
    </div>
  );
};

export default PostCreationPage;
