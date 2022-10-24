// import logo from './logo.svg';
import React from 'react';
import { Flowbite } from 'flowbite-react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ProfilePage from './pages/Profile';
import Footer from './components/Footer';
import Header from './components/Header';
import UsersPage from './pages/Users';
import { setAuthToken } from './features/auth/actions';
import UserPage from './pages/User';
import PostsPage from './pages/Posts';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
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
          <Router>
            <Routes>
              <Route path='/user' element={<UserPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/users' element={<UsersPage />} />
              <Route path='/posts' element={<PostsPage />} />
              <Route path='/posts/:categoryId' element={<PostsPage />} />
              <Route path='/posts/users/:userId' element={<PostsPage />} />
              {/* <Route path='*' element={<Navigate to='/' replace />} /> */}
            </Routes>
          </Router>
        </div>
        <Footer />
      </Flowbite>
    </>
  );
};

export default App;
