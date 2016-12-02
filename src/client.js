/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import useScroll from 'react-router-scroll';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import routes from './routes';
import reducers from './reducers';
import { AUTH } from 'constants/actions';

// import FastClick from 'fastclick';

// import queryString from 'query-string';
// import { createPath } from 'history/PathUtils';

// import { ErrorReporter, deepForceUpdate } from './core/devUtils';
import util from 'util';

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk));

const jwtToken = localStorage.getItem('jwtToken');
if (jwtToken) {
  store.dispatch({ type: AUTH.SUCCESS });
}

ReactDOM.render(
  <Provider store={store}>
    <Router
      history={browserHistory}
      routes={routes}
      // Fix HMR, I think this needs been remove when production.
      key={Math.random()}
    />
  </Provider>
  , document.getElementById('app')
);
