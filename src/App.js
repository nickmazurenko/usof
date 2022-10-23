// import logo from './logo.svg';
import React from 'react';
import { Flowbite } from 'flowbite-react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ProfilePage from './pages/Profile';
import Footer from './components/Footer';
import Header from './components/Header';
import UsersPage from './pages/Users';

const App = () => {
  return (
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
      <div className='min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <Router>
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/users' element={<UsersPage />} />
            </Routes>
          </Router>
        </div>
      </div>
      <Footer />
    </Flowbite>
  );
};

export default App;
