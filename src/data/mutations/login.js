import {
  GraphQLString,
  GraphQLNonNull,
}
  from 'graphql';

import passwordHash from 'password-hash';
import Admin from '../models/Admin';
import LoginType from '../types/LoginType';
import jwt from 'jsonwebtoken';
import { auth } from '../../config';

const login = {
  type: LoginType,
  args: {
    username: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  async resolve(obj, { username, password }) {
    let result = {
      errorMessage: '帳號或密碼有誤',
      authenticated: false,
      jwtToken: null,
    }

    const user = await Admin.findOne( {where: { username: username } } )

    if (passwordHash.verify(password, user.password)) {
      result.errorMessage = '';
      result.authenticated = true;

      const expiresIn = 60 * 60 * 24 * 180; // 180 days
      const token = jwt.sign({ ...user.toJSON(), admin: true }, auth.jwt.secret, { expiresIn });

      result.jwtToken = token;
    }

    return result;
  }
};

export default login;