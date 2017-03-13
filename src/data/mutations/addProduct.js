import { GraphQLList, GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql';
import { createClient } from 'redis';
import fetch from 'node-fetch';

import { redisUrl } from '../../config';
import { Product, Page } from '../models';

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

      redis.set(`live:${args.videoId}:products:latest`, JSON.stringify(args));
      redis.publish(`live:${args.videoId}:products:latest`, JSON.stringify(args));

      redis.quit();

      const page = await Page.findOne();

      if (page) {
        fetch(`https://graph.facebook.com/v2.8/${page.id}_${args.videoId}/comments`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            access_token: page.accessToken,
            message: `直播主上架了一個商品，快來看看！ https://live-api-explore-production.herokuapp.com/products/${product.id}`
          })
        });
      }

      return true;
    } else {
      return false;
    }
  }
};

export default AddProduct;