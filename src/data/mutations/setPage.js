import { GraphQLString, GraphQLBoolean } from 'graphql';

import { Page } from '../models';

const setPage = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLString },
    accessToken: { type: GraphQLString },
    name: { type: GraphQLString },
  },
  async resolve(fieldName, args, context, { rootValue: { request } }) {
    if (!request.user || !request.user.admin) {
      return false;
    }

    await Page.destroy({ where: {} });
    const page = await Page.create(args);

    if (page) {
      return true;
    } else {
      return false;
    }
  },
}

export default setPage;