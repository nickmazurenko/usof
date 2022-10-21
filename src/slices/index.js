import { combineReducers } from 'redux';

import users from './users/reducer';
import auth from './auth/reducer';

export default combineReducers({
  users,
  auth,
});
