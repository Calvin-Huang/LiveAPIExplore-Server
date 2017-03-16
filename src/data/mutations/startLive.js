import { GraphQLBoolean, GraphQLString } from 'graphql';
import { createClient } from 'redis';

import { redisUrl } from '../../config';

const startLive = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLString },
  },
  async resolve(fieldName, { id }, context, { rootValue: request }) {
    const addLivePromise = new Promise((resolve, reject) => {
      if (!request.user) {
        resolve(false);
      }

      const redis = createClient(redisUrl);
      redis.rpush('live', id, (err, reply) => {
        redis.quit();
        if (!err) {
          resolve(true);
        } else {
          reject(err);
        }
      });
    });

    return await addLivePromise;
  }
};

export default startLive;