import {
  FETCH_HOMES,
  FETCH_SINGLE,
  ADD_HOME,
  SET_QUERY,
  DELETE_HOME
} from '../actions/types';

const initialState = {
  list: [],
  currentHome: {},
  currentQuery: '?sort=-date&',
  loading: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HOMES: {
      return {
        ...state,
        list: action.payload,
        loading: false
      };
    }
    case FETCH_SINGLE: {
      return {
        ...state,
        currentHome: action.payload,
        loading: false
      };
    }
    case ADD_HOME: {
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false
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
        list: state.list.filter(home => home.id !== action.payload),
        loading: false
      };
    default:
      return state;
  }
};
