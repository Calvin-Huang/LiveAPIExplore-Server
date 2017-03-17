import { GraphQLList, GraphQLString } from 'graphql';

import ProductType from '../types/ProductType';
import { Product as ProductModel } from '../models';

const Product = {
	type: new GraphQLList(ProductType),
  args: {
    liveId: { type: GraphQLString },
  },
  async resolve(fieldName, { liveId }, context, { rootValue: { request } }) {
    const products = await ProductModel.findAll({
      where: {
        liveId: liveId,
      }
    });

    return products;
  }
};

export default Product;