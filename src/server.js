/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'babel-polyfill';
import http from 'http';
import path from 'path';
import express from 'express';
import xhub from 'express-x-hub';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import expressGraphQL from 'express-graphql';
import jwt from 'jsonwebtoken';
import { createClient } from 'redis';
import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, BrowserHistory, match, RouterContext } from 'react-router';
import useScroll from 'react-router-scroll';
import Helmet from 'react-helmet';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import PrettyError from 'pretty-error';
import App from './components/App';
import Html from './components/Html';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import passport from './core/passport';
import models from './data/models';
import schema from './data/schema';
import routes from './routes';
import reducers from './reducers';
import { port, auth, redisUrl } from './config';

import io from './socket';

const app = express();

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(xhub({ algorithm: 'sha1', secret: process.env.APP_SECRET }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Authentication
// -----------------------------------------------------------------------------
app.use(
  expressJwt({
    secret: auth.jwt.secret,
    credentialsRequired: false,
    getToken: function fromHeaderOrQuertstring(req) {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }

      return null;
    },
  }),
  (req, res, next) => {
    const allowedPaths = ['/login', '/graphql', '/auth/facebook', '/auth/facebook/callback', '/fb-subscribe'];

    if (allowedPaths.indexOf(req.path) > -1) {
      return next();
    }

    if (!req.user) {
      return res.sendStatus(401);
    }

    const adminAllowedPaths = ['/', '/users', '/admins'];
    if (adminAllowedPaths.indexOf(req.path) > -1) {
      if (!req.user.admin) {
        return res.sendStatus(401);
      }
    }

    return next();
  },
);
app.use(passport.initialize());

app.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['email', ], session: false }),
);
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/?failed=true', session: false }),
  (req, res) => {
    const expiresIn = 60 * 60 * 24 * 180; // 180 days
    const token = jwt.sign(req.user, auth.jwt.secret, { expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('/');
  },
);
// Verify with FB console.
app.get('/fb-subscribe', (req, res, next) => {
  if (req.param('hub.mode') == 'subscribe' && req.param('hub.verify_token') == process.env.VERIFY_TOKEN) {
    res.send(req.param('hub.challenge'));
  } else {
    res.sendStatus(400);
  }
});
// Subscriber for receiving FB notification.
app.post('/fb-subscribe',
  // Middleware for authorization.
  (req, res, next) => {
    if (req.isXHub && req.isXHubValid()) {
      return next();
    } else {
      res.sendStatus(401);
    }
  },
  (req, res) => {
    const { entry, object } = req.body;

    if (object === 'page') {
      entry.forEach((eachEntry) => {
        const { changes } = eachEntry;

        changes.forEach((change) => {
          const { field, value: { sender_name, sender_id, item, post_id, verb, message } } = change;

          // Handle feed
          if (field === 'feed') {

            // Add new comment into redis and broadcast to subscribers.
            if (item === 'comment' && verb === 'add') {
              const videoId = post_id.split('_')[1];
              const redis = createClient(redisUrl);

              redis.rpush(`live:${videoId}:comments`, message);
              redis.publish(`live:${videoId}:comments:latest`, message);

              redis.quit();
            }
          }
        });
      });
    }

    res.send('OK');
  }
);

//
// Register API middleware
// -----------------------------------------------------------------------------
app.use('/graphql', expressGraphQL(req => ({
  schema,
  graphiql: process.env.NODE_ENV !== 'production',
  rootValue: { request: req },
  pretty: process.env.NODE_ENV !== 'production',
})));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  try {
    const css = new Set();

    // const route = await UniversalRouter.resolve(routes, {
    //   path: req.path,
    //   query: req.query,
    // });

    // if (route.redirect) {
    //   res.redirect(route.status || 302, route.redirect);
    //   return;
    // }

    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {

        const store = createStore(reducers, applyMiddleware(thunk));

        const htmlChildren = ReactDOM.renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        );

        const html = ReactDOM.renderToStaticMarkup(<Html children={htmlChildren} />);

        res.status(200).send(`<!doctype html>${html}`);
      } else {
        res.status(404).send('Not found')
      }
    });

    // res.status(route.status || 200);
    // res.send(`<!doctype html>${html}`);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)); // eslint-disable-line no-console
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
/* eslint-disable no-console */
const server = http.createServer(app);
io.attach(server);

models.sync().catch(err => console.error(err.stack)).then(() => {
  server.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}/`);
  });
});
/* eslint-enable no-console */