import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import ProfileComponent from '../components/Profile';
import CardLoader from '../components/CardLoader';
import { loadCurrentUser } from '../features/auth/actions';
import { getPosts } from '../features/posts/actions';

const ProfilePage = () => {
  const { user, loading } = useSelector((state) => {
    return state.auth;
  });
  const { posts } = useSelector((state) => {
    return state.posts;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
    dispatch(loadCurrentUser());
  }, [dispatch]);
  return loading ? (
    <CardLoader />
  ) : (
    <ProfileComponent
      user={{
        ...user,
        recentPosts: posts
          .filter((post) => {
            return post.userId === user.id;
          })
          .slice(0, 3),
      }}
      loading={loading}
    />
  );
};

export default ProfilePage;
