import { GraphQLString, GraphQLBoolean } from 'graphql';

import fetch from 'node-fetch';
import { auth as config } from '../../config';
import { Page } from '../models';

const setPage = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLString },
    accessToken: { type: GraphQLString },
    name: { type: GraphQLString },
  },
  async resolve(fieldName, { id, accessToken, name }, context, { rootValue: { request } }) {
    if (!request.user || !request.user.admin) {
      return false;
    }

    await Page.destroy({ where: {} });

    // https://graph.facebook.com/oauth/access_token?client_id=576248362575567&client_secret=cc0208ef35d7bee877d6af59bc2123d8&grant_type=fb_exchange_token&fb_exchange_token=${accessToken}
    // Exchange short-token to long-token.
    const response = await fetch(`https://graph.facebook.com/oauth/access_token?client_id=${config.facebook.id}&client_secret=${config.facebook.secret}&grant_type=fb_exchange_token&fb_exchange_token=${accessToken}`)
      .then((res) => {
        return res.text();
      });

    const result = response
      .split('&')
      .map((parameterBundle) => {
        const parameterPair = parameterBundle.split('=');

        let returnObject = {};
        returnObject[parameterPair[0]] = parameterPair[1];

        return returnObject;
      });

    const page = await Page.create({
      id: id,
      accessToken: result[0].access_token,
      name: name,
    });

    if (page) {
      return true;
    } else {
      return false;
    }
  },
}

export default setPage;