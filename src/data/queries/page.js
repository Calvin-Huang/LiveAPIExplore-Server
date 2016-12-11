import { GraphQLString } from 'graphql';

import PageType from '../types/PageType';
import { Page as PageModel } from '../models';

const Page = {
  type: PageType,
  async resolve(fieldName, args, context, { rootValue: { request } }) {
    if (!request.user || !request.user.admin) {
      return null;
    }

    return await PageModel.findOne();
  },
};

export default Page;