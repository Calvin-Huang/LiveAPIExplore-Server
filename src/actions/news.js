import { FETCH_NEWS } from '../constants/actions';
import { createError } from './errors';

import 'whatwg-fetch';

export function fetchNews() {

  return dispatch => {
    return (
      (async () => {
        try {
          const resp = await fetch('/graphql', {
            method: 'post',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query: '{news{title,link,contentSnippet}}',
            }),
            credentials: 'include',
          });
          const { data } = await resp.json();
          if (!data || !data.news) throw new Error('Failed to load the news feed.');

          return dispatch({
            type: FETCH_NEWS.SUCCESS,
            payload: {
              news: data.news,
            }
          });
        } catch (err) {
          dispatch(createError(err));
        }
      })()
    );
  };
}
