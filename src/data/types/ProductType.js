import { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } from 'graphql';

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: {
    videoId: { type: GraphQLString },
    images: { type: new GraphQLList(GraphQLString) },
    name: { type: GraphQLString },
    price: { type: GraphQLInt },
    shippingDays: { type: GraphQLInt },
    otherDescription: { type: GraphQLString },
  }
});

export default ProductType;