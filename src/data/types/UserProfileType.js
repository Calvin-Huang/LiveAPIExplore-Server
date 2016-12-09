import { GraphQLObjectType, GraphQLString } from 'graphql'

const UserProfileType = new GraphQLObjectType({
  name: 'UserProfile',
  fields: {
    phone: { type: GraphQLString },
    displayName: { type: GraphQLString },
    gender: { type: GraphQLString },
  }
});

export default UserProfileType;