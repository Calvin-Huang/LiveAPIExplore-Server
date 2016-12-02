import { AUTH, SIGN_OUT } from '../constants/actions';

const INITIALL_STATE = { errorMessage: '', authenticated: false };

export default function (state = INITIALL_STATE, action) {
  switch (action.type) {

    case AUTH.SUCCESS:
      return { ...state, errorMessage: '', authenticated: true };

    case SIGN_OUT.SUCCESS:
      return { ...state, errorMessage: '', authenticated: false };

    case AUTH.FAILURE:
      return { ...state, errorMessage: action.payload.errorMessage };

    default:
      return state;

  }
}