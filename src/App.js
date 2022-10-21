// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import RegisterScreen from './components/RegisterScreen';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Router>
      <main className='container content'>
        <Routes>
          <Route path='/register' element={<RegisterScreen />} />
          {/* <Route element={<ProtectedRoute />}>
          <Route path='/user-profile' element={<ProfileScreen />} />
        </Route> */}
        </Routes>
      </main>
    </Router>
  </Provider>
);

export default App;
