import { GraphQLList, GraphQLString } from 'graphql';
import { createClient } from 'redis';

import { redisUrl } from '../../config';

const Comments = {
	type: new GraphQLList(GraphQLString),
  args: {
    liveId: { type: GraphQLString },
  },
  async resolve(fieldName, { liveId }, context, { rootValue: { request } }) {
    return new Promise((resolve, reject) => {
      const redis = createClient(redisUrl);
      
      redis.lrange(`live:${liveId}:comments`, 0, -1, (err, reply) => {
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

export default Comments;