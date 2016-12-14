import { GraphQLObjectType, GraphQLString } from 'graphql';

const LiveType = new GraphQLObjectType({
	name: 'Live',
  fields: {
    id: { type: GraphQLString },
  }
});

export default LiveType;