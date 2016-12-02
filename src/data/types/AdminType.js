import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

const AdminType = new GraphQLObjectType({
  name: 'Admin',
  fields: {
    id: { type: GraphQLInt },
    username: { type: GraphQLString },
  }
});

export default AdminType;