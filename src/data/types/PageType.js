import { GraphQLObjectType, GraphQLString } from 'graphql';

const PageType = new GraphQLObjectType({
  name: 'Page',
  fields: {
    id: { type: GraphQLString },
    accessToken: { type: GraphQLString },
    name: { type: GraphQLString },
  }
});

export default PageType;