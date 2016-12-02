const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  const requestType = {};
  [REQUEST, SUCCESS, FAILURE].forEach(type => {
    requestType[type] = `${base}_${type}`;
  });

  return requestType;
}

export const FETCH_NEWS = createRequestTypes('FETCH_NEWS');
export const FETCH_FB_AUTH = createRequestTypes('FETCH_FB_AUTH');
export const FETCH_ADMINS = createRequestTypes('FETCH_ADMINS');

export const ADD_ADMIN = createRequestTypes('ADD_ADMIN');
export const DELETE_ADMIN = createRequestTypes('DELETE_ADMIN');

export const SIGN_OUT = createRequestTypes('SIGN_OUT');
export const AUTH = createRequestTypes('AUTH');

export const CREATE_ERROR = 'CREATE_ERROR';
export const DELETE_ERROR = 'DELETE_ERROR';
