/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import {
  GraphQLSchema as Schema,
  GraphQLObjectType as ObjectType,
} from 'graphql';

import me from './queries/me';
import content from './queries/content';
import news from './queries/news';
import fbAuth from './queries/fbAuth';
import admin from './queries/admin';
import live from './queries/live';
import page from './queries/page';

import login from './mutations/login';
import addAdmin from './mutations/addAdmin';
import deleteAdmin from './mutations/deleteAdmin';
import registerOrLogin from './mutations/registerOrLogin';
import setPage from './mutations/setPage';
import products from './mutations/products';
import addProduct from './mutations/addProduct';
import comments from './mutations/comments';

const schema = new Schema({
  query: new ObjectType({
    name: 'Query',
    fields: {
      me,
      content,
      news,
      fbAuth,
      admin,
      live,
      page,
    },
  }),
  mutation: new ObjectType({
    name: 'Mutation',
    fields: {
      login,
      addAdmin,
      deleteAdmin,
      registerOrLogin,
      setPage,
      products,
      addProduct,
      comments,
    }
  })
});

export default schema;
