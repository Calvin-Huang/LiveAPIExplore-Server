import { GraphQLBoolean, GraphQLString } from 'graphql';
import { createClient } from 'redis';

import { redisUrl } from '../../config';

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

      const redis = createClient(redisUrl);
      redis.rpush('live', id, (err, reply) => {
        if (!err) {
          resolve(true);
        } else {
          reject(err);
        }
        redis.quit();
      });
    });
  }
};

export default startLive;