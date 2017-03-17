import { GraphQLList, GraphQLString } from 'graphql';
import { createClient } from 'redis';

import { redisUrl } from '../../config';

const Comments = {
	type: new GraphQLList(GraphQLString),
  args: {
    videoId: { type: GraphQLString },
  },
  async resolve(fieldName, { videoId }, context, { rootValue: { request } }) {
    return new Promise((resolve, reject) => {
      const redis = createClient(redisUrl);
      
      redis.lrange(`live:${videoId}:comments`, 0, -1, (err, reply) => {
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