import { GraphQLInt, GraphQLNonNull, GraphQLBoolean } from 'graphql';

import Admin from '../models/admin';

const deleteAdmin = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },

  async resolve(obj, {id}, context, { rootValue: { request } }) {
    if (!request.user) {
      return false;
    }

    const affectedRows = Admin.destroy({ where: { id: id } });

    return (affectedRows <= 0 ? false : true);
  }
}

export default deleteAdmin;
