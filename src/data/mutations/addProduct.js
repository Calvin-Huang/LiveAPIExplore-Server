import { GraphQLList, GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql';
import { createClient } from 'redis';

import { redisUrl } from '../../config';
import { Product } from '../models';

const AddProduct = {
	name: 'AddProduct',
  type: GraphQLBoolean,
	args: {
		videoId: { type: GraphQLString },
    imageUrls: { type: new GraphQLList(GraphQLString) },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    shippingDays: { type: GraphQLInt },
    otherDescription: { type: GraphQLString },
	},
  async resolve(fieldName, args, context, { rootValue: { request } }) {
    if (!request.user) {
      return false;
    }

    const product = await Product.create(args);

    if (product) {
      const redis = createClient(redisUrl);

      redis.set(`live:${videoId}:products:latest`, JSON.stringify(args));
      redis.publish(`live:${videoId}:products:latest`, JSON.stringify(args));

      redis.quit();

      return true;
    } else {
      return false;
    }
  }
};

export default AddProduct;