import { combineReducers } from 'redux';

import auth from './auth/reducer';
import categories from './categories/reducer';
import comments from './comments/reducer';
import likes from './likes/reducer';
import notifications from './notifications/reducer';
import posts from './posts/reducer';
import users from './users/reducer';

export default combineReducers({
  auth,
  categories,
  comments,
  likes,
  notifications,
  posts,
  users,
});
