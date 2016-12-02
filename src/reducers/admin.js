import { FETCH_ADMINS, ADD_ADMIN, DELETE_ADMIN } from '../constants/actions';

const INITIAL_STATE = []

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ADMINS.SUCCESS:
      return action.payload;
    case ADD_ADMIN.SUCCESS:
      return [
        ...state,
        action.payload.admin,
      ];
    case DELETE_ADMIN.SUCCESS:
      return state.filter((item) => { return item.id != action.payload.id; });
    default:
      return state;
  }
}