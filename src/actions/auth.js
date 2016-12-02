import { AUTH, SIGN_OUT } from '../constants/actions';
import { createError } from './errors';

import 'whatwg-fetch';

export function authentication(username, password) {
  return dispatch => {
    return (
      (async () => {
        const nextState = {
          type: AUTH.FAILURE,
          payload: {
            jwtToken: '',
            errorMessage: '',
          },
        };

        try {
          const resp = await fetch('/graphql', {
            method: 'post',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              query: `mutation {login(username: \"${username}\", password: \"${password}\") {errorMessage,authenticated,jwtToken}}`,
            }),
            credentials: 'include'
          });

          const { data } = await resp.json();

          if (!data || !data.login) throw new Error('Login Failed');

          localStorage.setItem('jwtToken', data.login.jwtToken);

          if (data.login.authenticated) {
            nextState.type = AUTH.SUCCESS;
          }

          nextState.payload = data.login;
        } catch(e) {
          nextState.payload.errorMessage = '帳號或密碼錯誤';
        }

        return dispatch(nextState);
      })()
    )
  }
}

export function signOut() {
  localStorage.removeItem('jwtToken');
  return dispatch => {
    dispatch({
      type: SIGN_OUT.SUCCESS,
      payload: {
        errorMessage: '',
        authenticated: false,
      }
    });
  }
}