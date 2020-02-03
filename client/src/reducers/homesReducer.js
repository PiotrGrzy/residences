import {
  FETCH_HOMES,
  FETCH_SINGLE,
  ADD_HOME,
  CLEAR_CURRENT,
  SET_QUERY,
  DELETE_HOME,
  SET_LOADING,
  ACTION_FAILED,
  UPDATE_HOME
} from '../actions/types';

const initialState = {
  list: [],
  currentHome: null,
  currentQuery: '?sort=-date&',
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case ACTION_FAILED: {
      return {
        ...state,
        loading: false
      };
    }
    case CLEAR_CURRENT: {
      return {
        ...state,
        currentHome: null
      };
    }
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
    case UPDATE_HOME: {
      console.log(action.payload);
      return {
        ...state,
        currentHome: action.payload,
        list: state.list.map(home =>
          home._id === action.payload.id ? action.payload : home
        ),
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
