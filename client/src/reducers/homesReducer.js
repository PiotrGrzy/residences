import { FETCH_HOMES, FETCH_SINGLE } from '../actions/types';

const initialState = {
  list: [],
  currentHome: {}
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
    default:
      return state;
  }
};
