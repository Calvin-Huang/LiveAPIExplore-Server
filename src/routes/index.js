import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from '../components/App';
import Layout from '../components/Layout';

import FBAuth from './FBAuth';
import Users from './users';
import Admin from './admins';
import Login from './login';
import NotFound from './notFound';

function requireAuth(nextState, replace) {
  try {
    const jwtToken = localStorage.getItem('jwtToken');

    if (jwtToken == null) {
      replace('/login');
    }
  } catch(e) {
    // Need to fix? Because react form server render doesn't have localStorage.
    // However, if already authenticated, redirect to login view is wrong behavior.
    // replace('/login');
  }
}

export default (
  <Route path="/" component={App}>
    <Route component={Layout} onEnter={requireAuth} >
      <IndexRoute component={FBAuth} />
      <Route path="/users" component={Users} />
      <Route path="/admins" component={Admin} />
    </Route>

    <Route path="/login" component={Login} />
    <Route path="*" component={NotFound} />
  </Route>
);
