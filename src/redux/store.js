import { configureStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import reducer from './reducer';

const initialState = {};
const middleware = [thunk];

const store = configureStore();