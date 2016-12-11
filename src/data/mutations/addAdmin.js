import { GraphQLString, GraphQLBoolean, GraphQLObjectType } from 'graphql';
import AdminType from '../types/AdminType';

import { Admin } from '../models';

import passwordHash from 'password-hash';

const addAdmin = {
  type: new GraphQLObjectType({
    name: 'AddAdmin',
    fields: {
      status: { type: GraphQLBoolean },
      message: { type: GraphQLString },
      admin: { type: AdminType }
    }
  }),
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },

  async resolve(obj, {username, password}, context, { rootValue: { request } }) {
    let response = {
      status: false,
      message: '',
      admin: null,
    };

    if (!request.user) {
      response.message = 'Unauthorized';
    }

    if (!username || !password) {
      response.message = 'Username or Password can not be null.';

    } else {

      try {
        const admin = await Admin.create({ username: username, password: passwordHash.generate(password) });
        const entireAdmin = await Admin.findOne({ where: { username: admin.username } });

        response.status = true;
        response.message = 'Create user success!';
        response.admin = entireAdmin;

      } catch (err) {
        response.message = err.errors.map((error) => { return error.message; }).join(', ');
      }
    }

    return response;
  }
}

export default addAdmin;
