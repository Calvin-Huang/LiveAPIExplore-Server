import { GraphQLObjectType, GraphQLString } from 'graphql';

const LiveType = new GraphQLObjectType({
	name: 'Live',
  fields: {
    videoId: { type: GraphQLString },
  }
});

export default LiveType;