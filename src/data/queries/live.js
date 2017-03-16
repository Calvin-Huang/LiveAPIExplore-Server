import { GraphQLList } from 'graphql';
import { createClient } from 'redis';

import LiveType from '../types/LiveType';

import { redisUrl } from '../../config';

const live = {
  type: new GraphQLList(LiveType),
  resolve(fieldName, args, context, { rootValue: { request } }) {
    return new Promise((resolve, reject) => {
      const redis = createClient(redisUrl);
      
      redis.smembers('live', (err, reply) => {
        if (!err) {
          resolve(reply.map((live) => { return { videoId: live }; }));
        } else {
          reject(err);
        }
        redis.quit();
      });
    });
  }
};

export default live;