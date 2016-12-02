import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
}
from 'graphql';

const LoginType = new GraphQLObjectType({
  name: 'Login',
  fields: {
    errorMessage: { type: GraphQLString },
    authenticated: { type: GraphQLBoolean },
    jwtToken: { type: GraphQLString },
  }
})

export default LoginType;
