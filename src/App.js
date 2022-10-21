// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <div className='min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <Router>
            <Routes>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
            </Routes>
          </Router>
        </div>
      </div>
    </Provider>
  );
};

export default App;
