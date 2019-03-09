import { ACTIONS } from '.';
import client from '../configure.graphql';
import { peopleQuery } from './graphql/queries';

export function fetchPeople() {
  return (dispatch, getState) => {
    dispatch({ type: ACTIONS.PEOPLE.FETCH_PEOPLE });
    client
      .query({
        query: peopleQuery
      })
      .then(resp => {
        if (resp.data) {
          dispatch({
            type: ACTIONS.PEOPLE.FETCH_PEOPLE_SUCCESS,
            payload: resp.data.people
          });
        }
      });
  };
}
