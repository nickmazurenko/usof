// import logo from './logo.svg';
import React from 'react';
import { Flowbite } from 'flowbite-react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ProfilePage from './pages/Profile';
import Footer from './components/Footer';
import Header from './components/Header/Header';
import UsersPage from './pages/Users';
import { setAuthToken } from './features/auth/actions';
import UserPage from './pages/User';
import PostsPage from './pages/Posts';
import Post from './pages/Post';
import PasswordResetPage from './pages/PasswordReset';
import 'react-toastify/dist/ReactToastify.css';
import CategoriesPage from './pages/Categories';
import PostCreationPage from './pages/PostCreation';
import UnknownPage from './pages/UnknownPage';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const { isAuthenticated } = useSelector((state) => {
    return state.auth;
  });

  return (
    <>
      <Flowbite
        theme={{
          theme: {
            alert: {
              color: {
                primary: 'bg-primary',
              },
            },
          },
        }}>
        <Header />
        <div>
          <ToastContainer />
          <Router>
            <Routes>
              <Route path='/user/:id' element={<UserPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              {isAuthenticated ? (
                <>
                  <Route path='/posts/create' element={<PostCreationPage />} />
                  <Route path='/posts/update/:postId' element={<PostCreationPage />} />
                  <Route path='/profile' element={<ProfilePage />} />
                </>
              ) : null}
              <Route path='/users' element={<UsersPage />} />
              <Route path='/posts' element={<PostsPage />} />
              <Route path='/' element={<PostsPage />} />
              <Route path='/post/:postId' element={<Post />} />
              <Route
                path='/posts/category/:categoryId'
                element={<PostsPage />}
              />
              <Route path='/posts/users/:userId' element={<PostsPage />} />
              <Route
                path='/password-reset/:token'
                element={<PasswordResetPage />}
              />
              <Route path='/categories' element={<CategoriesPage />} />
              {/* <Route path='*' element={<Navigate to='/posts' replace />} /> */}
              <Route path='*' element={<UnknownPage/>} />
            </Routes>
          </Router>
        </div>
        <Footer />
      </Flowbite>
    </>
  );
};

export default App;
