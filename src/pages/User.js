import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ProfileComponent from '../components/Profile';
import CardLoader from '../components/CardLoader';
import { getUser } from '../features/users/actions';
import { getPosts } from '../features/posts/actions';

const UserPage = () => {
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    dispatch(getUser(params.id));
    dispatch(getPosts());
  }, [dispatch]);
  const { user, loading } = useSelector((storeState) => {
    return storeState.users;
  });
  const { posts } = useSelector((storeState) => {
    return storeState.posts;
  });
  return loading || !user ? (
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

export default UserPage;
