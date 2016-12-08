import fetch from 'node-fetch';
import { expect } from 'chai';

import { Admin, User } from './data/models';
import passwordHash from 'password-hash';

import runServer from '../tools/runServer';

import util from 'util';

describe('server', () => {
  context('will protect resources', () => {
    let serve = null;

    before(async () => {

      // Wait for server up
      serve = await runServer();

      // Prepare Admin & User's fixture
      Admin.insertOrUpdate({ username: 'calvin.admin@capslock.tw', password: passwordHash.generate('12364362') });
    });

    after(() => {
      serve.kill('SIGTERM');

      Admin.destroy({ where: { username: 'calvin.admin@capslock.tw' } });
      User.destroy({ where: { email: 'calvin.user@capslock.tw' } });
    });

    it('should prevent response context without authorization', async () => {
      const response = await fetch('http://localhost:3000/');

      expect(response.status).to.eq(401);
    });

    it('should allow to visit the login page', async () => {
      const response = await fetch('http://localhost:3000/login');

      expect(response.status).to.eq(200);
    });

    it('should allow to visit the graphql resource', async () => {
      const response = await fetch('http://localhost:3000/graphql', { method: 'POST' });

      expect(response.status).to.eq(400);
    })

    it('should allow visit to root path with admin credential', async () => {
      const query = `
        mutation ($username: String!, $password: String!){
          login(username: $username, password: $password) {
            jwtToken
          }
        }
      `;
      const variables = {
        username: 'calvin.admin@capslock.tw',
        password: '12364362',
      }

      const login = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query, variables: variables }),
      });

      const jwtToken = (await login.json()).data.login.jwtToken;

      const response = await fetch('http://localhost:3000/', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      expect(response.status).to.eq(200);
    });

    it('should prevent visit root page with user credential', async () => {
      const query = `
        mutation ($id: ID!, $email:String, $claim: InputUserClaim, $profile: InputUserProfile) {
          registerOrLogin(id: $id, email: $email, claim: $claim, profile: $profile) {
            jwtToken
          }
        }
      `;
      const variables = {
        id: '0c099de0-b2f4-11e6-8c63-a7513db19171',
        email: 'calvin.user@capslock.tw',
        claim: {
          accessToken: 'test',
        },
        profile: {
          displayName: 'Calvin Huang',
          gender: 'male',
        }
      };

      const login = await fetch('http://localhost:3000/graphql', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query, variables: variables }),
      });

      const jwtToken = (await login.json()).data.registerOrLogin.jwtToken;

      const response = await fetch('http://localhost:3000/', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      expect(response.status).to.eq(401);
    });
  });
});