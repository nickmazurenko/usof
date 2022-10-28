import { Routes, Route } from 'react-router-dom';
import UserPage from './pages/User';
import PostPage from './pages/Post';
import UsersPage from './pages/Users';
import PostsPage from './pages/Posts';
import LoginPage from './pages/Login';
import ProfilePage from './pages/Profile';
import UnknownPage from './pages/UnknownPage';
import RegisterPage from './pages/Register';
import CategoriesPage from './pages/Categories';
import PasswordResetPage from './pages/PasswordReset';
import PostCreationPage from './pages/PostCreation';

const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path='/user/:id' element={<UserPage />} />
        <Route path='/login' element={<ProfilePage />} />
        <Route path='/register' element={<ProfilePage />} />
        <Route path='/posts/create' element={<PostCreationPage />} />
        <Route path='/posts/update/:postId' element={<PostCreationPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/users' element={<UsersPage />} />
        <Route path='/posts' element={<PostsPage />} />
        <Route path='/' element={<PostsPage />} />
        <Route path='/post/:postId' element={<PostPage />} />
        <Route path='/posts/category/:categoryId' element={<PostsPage />} />
        <Route path='/posts/users/:userId' element={<PostsPage />} />
        <Route path='/password-reset/:token' element={<PasswordResetPage />} />
        <Route path='/categories' element={<CategoriesPage />} />
        <Route path='*' element={<UnknownPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path='/user/:id' element={<UserPage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/posts/create' element={<LoginPage />} />
      <Route path='/posts/update/:postId' element={<LoginPage />} />
      <Route path='/profile' element={<LoginPage />} />
      <Route path='/users' element={<UsersPage />} />
      <Route path='/posts' element={<PostsPage />} />
      <Route path='/' element={<PostsPage />} />
      <Route path='/post/:postId' element={<PostPage />} />
      <Route path='/posts/category/:categoryId' element={<PostsPage />} />
      <Route path='/posts/users/:userId' element={<PostsPage />} />
      <Route path='/password-reset/:token' element={<PasswordResetPage />} />
      <Route path='/categories' element={<CategoriesPage />} />
      <Route path='*' element={<UnknownPage />} />
    </Routes>
  );
};

export default useRoutes;
