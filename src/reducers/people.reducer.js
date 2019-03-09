import { ACTIONS } from '../actions';

const initialState = {
  fetching: false,
  fetched: false,
  people: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.PEOPLE.FETCH_PEOPLE:
      return {
        ...state,
        fetched: false,
        fetching: true,
      };
    case ACTIONS.PEOPLE.FETCH_PEOPLE_SUCCESS:
      return {
        ...state,
        fetched: true,
        fetching: false,
        people: action.payload
      };
    case ACTIONS.PEOPLE.FETCH_PEOPLE_REJECT:
      return {
        ...state,
        fetched: false,
        fetching: false,
        people: [],
        error: action.payload
      };
    default:
      return state;
  }
};
