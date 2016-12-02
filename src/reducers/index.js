import { combineReducers } from 'redux';

import auth from './auth';
import news from './news';
import fbAuth from './fbAuth';
import admin from './admin';

const rootReducer = combineReducers({
  auth,
  news,
  fbAuth,
  admin,
});

export default rootReducer;
