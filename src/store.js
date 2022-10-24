import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import usersReducer from './features/users/reducer';
import authReducer from './features/auth/reducer';
import postsReducer from './features/posts/reducer';
import commentsReducer from './features/comments/reducer';

const persistConfig = {
  key: 'root',
  storage,
};

const authPersistsConfig = {
  key: 'auth',
  storage,
  blacklist: ['isAuthenticated, loading'],
};

const rootReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer,
  comments: commentsReducer,
  auth: persistReducer(authPersistsConfig, authReducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: [thunk],
});

export const persistor = persistStore(store);
