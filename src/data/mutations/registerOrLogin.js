import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
} from 'graphql';

import jwt from 'jsonwebtoken';
import { auth } from '../../config';

import { User, UserClaim, UserProfile } from '../models';

const RegisterOrLogin = {
  type: new GraphQLObjectType({
    name: 'RegisterOrLogin',
    fields: {
      jwtToken: { type: GraphQLString },
    }
  }),
  args: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    email: { type: GraphQLString },
    claim: {
      type: new GraphQLInputObjectType({
        name: 'InputUserClaim',
        fields: {
          accessToken: { type: GraphQLString },
        }
      })
    },
    profile: {
      type: new GraphQLInputObjectType({
        name: 'InputUserProfile',
        fields: {
          phone: { type: GraphQLString },
          displayName: { type: GraphQLString },
          gender: { type: GraphQLString },
        }
      })
    },
  },
  async resolve(obj, { id, email, claim, profile }) {
    const claimType = 'urn:facebook:access_token';
    await User.upsert({
      id: id,
      email: email,
      emailConfirmed: true,
    });

    await UserClaim.findOrCreate({
      where: {
        userId: id,
        type: claimType,
        value: claim.accessToken
      },
      defaults: {
        userId: id,
        type: claimType,
        value: claim.accessToken
      }
    });

    await UserProfile.upsert({
      userId: id,
      displayName: profile.displayName,
      gender: profile.gender,
      picture: `https://graph.facebook.com/${id}/picture?type=large`,
    });

    const user = await User.findByPrimary(id, {
      include: [
        { model: UserClaim, as: 'claims', order: [['id', 'DESC']], limit: 1 },
        { model: UserProfile, as: 'profile' },
      ]
    });

    const expiresIn = 60 * 60 * 24 * 180; // 180 days
    let jwtToken = null;

    if (user != null) {
      jwtToken = jwt.sign(user.toJSON(), auth.jwt.secret, { expiresIn });
    }

    return { jwtToken: jwtToken };
  }
};

export default RegisterOrLogin;