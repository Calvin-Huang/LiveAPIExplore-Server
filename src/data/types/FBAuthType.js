import { GraphQLObjectType, GraphQLString } from 'graphql';

const FBAuthType = new GraphQLObjectType({
  name: 'FBAuth',
  fields: {
    accessToken: { type: GraphQLString },
    expiresIn: { type: GraphQLString },
  },
});

export default FBAuthType;