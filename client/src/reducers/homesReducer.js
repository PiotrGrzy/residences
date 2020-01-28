import { FETCH_HOMES, FETCH_SINGLE, SET_QUERY } from '../actions/types';

const initialState = {
  list: [],
  currentHome: {},
  currentQuery: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HOMES: {
      return {
        ...state,
        list: action.payload
      };
    }
    case FETCH_SINGLE: {
      return {
        ...state,
        currentHome: action.payload
      };
    }
    case SET_QUERY:
      return {
        ...state,
        currentQuery: action.payload
      };

    default:
      return state;
  }
};
