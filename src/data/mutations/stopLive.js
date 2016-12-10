import { GraphQLBoolean, GraphQLString } from 'graphql';
import { createClient } from 'redis';

const stopLive = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLString },
  },
  resolve(fieldName, { id }, context, { rootValue: request }) {
    return new Promise((resolve, reject) => {
      if (!request.user) {
        resolve(false);
      }

      const redis = createClient();
      redis.lrem('live', id, -1, (err, reply) => {
        if (!err) {
          resolve(true);
        } else {
          reject(err);
        }
      });
    });
  }
};

export default stopLive;