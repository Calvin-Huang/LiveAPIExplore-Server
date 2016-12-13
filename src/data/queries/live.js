import { GraphQLList, GraphQLString } from 'graphql';
import { createClient } from 'redis';

import { redisUrl } from '../../config';

const live = {
  type: new GraphQLList(GraphQLString),
  resolve(fieldName, args, context, { rootValue: { request } }) {
    return new Promise((resolve, reject) => {
      const redis = createClient(redisUrl);
      
      redis.lrange('live', 0, -1, (err, reply) => {
        if (!err) {
          resolve(reply);
        } else {
          reject(err);
        }
        redis.quit();
      });
    });
  }
};

export default live;