import {
  FETCH_HOMES,
  FETCH_SINGLE,
  SET_QUERY,
  DELETE_HOME
} from '../actions/types';

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
    case DELETE_HOME:
      return {
        ...state,
        list: state.list.filter(home => home.id !== action.payload)
      };
    default:
      return state;
  }
};
