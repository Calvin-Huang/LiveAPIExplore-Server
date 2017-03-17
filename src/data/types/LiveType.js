import { GraphQLObjectType, GraphQLString } from 'graphql';

const LiveType = new GraphQLObjectType({
	name: 'Live',
  fields: {
    videoId: { type: GraphQLString },
    liveId: { type: GraphQLString },
  }
});

export default LiveType;