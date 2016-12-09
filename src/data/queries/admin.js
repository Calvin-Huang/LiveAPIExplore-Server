import { GraphQLString, GraphQLList } from 'graphql';
import AdminType from '../types/AdminType';

import Admin from '../models/Admin';

const admin = {
  type: new GraphQLList(AdminType),
  resolve(fieldName, args, context, { rootValue: { request } }) {
    if (request.user && request.user.admin) {
      return Admin.findAll();
    } else {
      return new Promise((resolve) => { resolve([]); });
    }
  }
}

export default admin;
