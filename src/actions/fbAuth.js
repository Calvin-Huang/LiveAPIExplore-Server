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

          return dispatch({
            type: FETCH_FB_AUTH.SUCCESS,
            payload: {
              fbAuth: data.fbAuth,
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