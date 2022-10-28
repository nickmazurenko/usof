/* eslint-disable arrow-body-style */
import { Button } from 'flowbite-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost, updatePost } from '../../features/posts/actions';
import CategoriesCard from './CategoriesCard';
import ContentCard from './ContentCard';
import DiscardModal from './DiscardModal';
import TitleCard from './TitleCard';

const initialFormState = { title: '', content: '', categories: '' };

const PostCreationForm = ({ post }) => {
  const { title, content } = post() || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    auth: { user },
    posts: { error, loading },
  } = useSelector((state) => {
    return state;
  });
  const [step, setStep] = useState(post() ? 'categories' : 'title');
  const [formState, setFormState] = useState(
    post() ? { title, content } : initialFormState
  );

  const onChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const submitForm = (discard = false) => {
    if (discard) {
      setStep('title');
      return setFormState(initialFormState);
    }
    if (!loading && !error) navigate(`/posts/users/${user.id}`, { replace: true });
    if (post()) return dispatch(updatePost(formState, post().id));
    return dispatch(createPost(formState));
  };
  return (
    <div className='flex m-5 flex-col space-y-4 lg:w-1/2'>
      <TitleCard
        onChange={onChange}
        step={step}
        setStep={setStep}
        value={formState.title}
      />
      <ContentCard
        onChange={onChange}
        step={step}
        setStep={setStep}
        value={formState.content}
      />
      {post() ? null : (
        <CategoriesCard
          onChange={onChange}
          step={step}
          setStep={setStep}
          value={formState.categories}
        />
      )}

      <div className='flex flex-wrap space-x-2'>
        <div className='w-1/5'>
          <Button onClick={() => submitForm()} disabled={step !== 'categories'}>
            Submit
          </Button>
        </div>
        <div className='w-1/5'>
          <DiscardModal submit={submitForm} disabled={step !== 'categories'} />
        </div>
      </div>
    </div>
  );
};

export default PostCreationForm;
