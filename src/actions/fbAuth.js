import { FETCH_FB_AUTH } from '../constants/actions';
import { createError } from './errors';

import 'whatwg-fetch';

export function fetchFBAuth() {
  return dispatch => {
    return (
      (async () => {
        try {
          const resp = await fetch('/graphql', {
            method: 'post',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            },
            body: JSON.stringify({
              query: '{fbAuth{accessToken,expiresIn}}'
            }),
            credentials: 'include',
          });
          const { data } = await resp.json();
          if (!data || !data.fbAuth) throw new Error('Failed to fetch auth.');

          const graphApiResp = await fetch(`https://graph.facebook.com/v2.8/me/accounts?access_token=${data.fbAuth.accessToken}`, {
            method: 'GET',
          });

          const accounts = (await graphApiResp.json()).data;

          return dispatch({
            type: FETCH_FB_AUTH.SUCCESS,
            payload: {
              fbAuth: data.fbAuth,
              accounts: accounts,
            }
          })
        } catch(e) {
          console.log(e);
          dispatch(createError(e));
        }
      })()
    )
  }
}