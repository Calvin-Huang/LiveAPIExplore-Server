import { FETCH_ADMINS, ADD_ADMIN, DELETE_ADMIN } from '../constants/actions';
import { createError } from './errors';

import 'whatwg-fetch';

export function fetchAdmins() {
  return async (dispatch) => {
    try {
      const resp = await fetch('/graphql', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
        body: JSON.stringify({
          query: '{admin{id,username}}',
        }),
      });

      const { data } = await resp.json();

      if (!data || !data.admin) { throw new Error('Fail to fetch admins.'); }

      return dispatch({
        type: FETCH_ADMINS.SUCCESS,
        payload: data.admin,
      });
    } catch (err) {
      return dispatch(createError(err));
    }
  };
}

export function addAdmin(username, password) {
  return async (dispatch) => {
    try {
      const resp = await fetch('/graphql', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
        body: JSON.stringify({
          query: `mutation{addAdmin(username:"${username}",password:"${password}"){status,message,admin{id,username}}}`
        }),
      });

      const { data } = await resp.json();

      if (!data || !data.addAdmin || !data.addAdmin) { throw new Error('Fail to add admin'); }

      return dispatch({
        type: (data.addAdmin.status ? ADD_ADMIN.SUCCESS : ADD_ADMIN.FAILURE),
        payload: data.addAdmin,
      });
    } catch (err) {
      return dispatch(createError(err));
    }
  };
}

export function deleteAdmin(id) {
  return async (dispatch) => {
    try {
      const resp = await fetch('/graphql', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
        },
        body: JSON.stringify({
          query: `mutation{deleteAdmin(id:${id})}`
        }),
      });

      const { data } = await resp.json();

      if (data === undefined || data === null) { throw new Error('Fail to delete admin.'); }

      return dispatch({
        type: data ? DELETE_ADMIN.SUCCESS : DELETE_ADMIN.FAILURE,
        payload: { id: id },
      });
    } catch (err) {
      return dispatch(createError(err));
    }
  }
}