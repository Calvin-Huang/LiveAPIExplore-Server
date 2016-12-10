import { GraphQLBoolean, GraphQLString } from 'graphql';
import { createClient } from 'redis';

const startLive = {
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
      redis.rpush('live', id, (err, reply) => {
        if (!err) {
          resolve(true);
        } else {
          reject(err);
        }
      });
    });
  }
};

export default startLive;