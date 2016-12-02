import { GraphQLString, GraphQLList } from 'graphql';
import AdminType from '../types/AdminType';

import Admin from '../models/Admin';

const admin = {
  type: new GraphQLList(AdminType),
  resolve() {
    return Admin.findAll();
  }
}

export default admin;
