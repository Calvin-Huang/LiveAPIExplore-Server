import { GraphQLObjectType, GraphQLString } from 'graphql';

const UserClaimType = new GraphQLObjectType({
  name: 'UserClaim',
  fields: {
    type: { type: GraphQLString },
    accessToken: { type: GraphQLString },
  }
});

export default UserClaimType;