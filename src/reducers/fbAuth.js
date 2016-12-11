import { FETCH_FB_AUTH } from '../constants/actions';

const INITIAL_STATE = {
  accessToken: '',
  expiresIn: '',
}

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_FB_AUTH.SUCCESS:
      return action.payload;
    default:
      return state
  }
};
