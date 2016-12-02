import { FETCH_NEWS } from '../constants/actions';

import util from 'util';

const INITIAL_STATE = {
  news: []
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_NEWS.SUCCESS:
      return {
        ...state,
        news: action.payload.news,
      };

    default:
      return state;
  }
}
