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
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ProfilePage from './pages/Profile';
import Footer from './components/Footer';
import Header from './components/Header';
import UsersPage from './pages/Users';
import { setAuthToken } from './features/auth/actions';

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
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/users' element={<UsersPage />} />
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
