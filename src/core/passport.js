import passport from 'passport'
import { Strategy as FaceBookStrategy } from 'passport-facebook';
import { auth as config } from '../config';
import { FB, FacebookApiException } from 'fb';
import fetch from 'node-fetch';

import { FBAuth } from '../data/models';

import util from 'util';

passport.use(new FaceBookStrategy({
  clientID: config.facebook.id,
  clientSecret: config.facebook.secret,
  callbackURL: '/auth/facebook/callback',
  profileFields: ['name', 'email'],
  passReqCallback: true,
}, async (accessToken, refreshToken, profile, done) => {
  console.log(`accessToken: ${accessToken}`);

  // https://graph.facebook.com/oauth/access_token?client_id=576248362575567&client_secret=cc0208ef35d7bee877d6af59bc2123d8&grant_type=fb_exchange_token&fb_exchange_token=${accessToken}
  // Exchange short-token to long-token.
  const response = await fetch(`https://graph.facebook.com/oauth/access_token?client_id=${config.facebook.id}&client_secret=${config.facebook.secret}&grant_type=fb_exchange_token&fb_exchange_token=${accessToken}`)
    .then((res) => {
      return res.text();
    });

  const result = response
    .split('&')
    .map((parameterBundle) => {
      const parameterPair = parameterBundle.split('=');

      let returnObject = {};
      returnObject[parameterPair[0]] = parameterPair[1];

      return returnObject;
    });

  const expireDate = new Date();
  expireDate.setSeconds(expireDate.getSeconds() + result[0].expires);

  const fbAuth = FBAuth.create({
    accessToken: result[0].access_token,
    expiresIn: expireDate,
  });

  done(null, fbAuth);
}));

export default passport;