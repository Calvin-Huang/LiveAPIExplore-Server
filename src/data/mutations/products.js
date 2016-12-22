import { GraphQLList, GraphQLString } from 'graphql';

import ProductType from '../types/ProductType';
import { Product } from '../models';

const Product = {
	type: new GraphQLList(ProductType),
  args: {
    videoId: { type: GraphQLString },
  },
  async resolve(fieldName, { videoId }, context, { rootValue: { request } }) {
    const products = await Product.findAll({
      where: {
        videoId: videoId,
      }
    });

    return products;
  }
};

export default Product;