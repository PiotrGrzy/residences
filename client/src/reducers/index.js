import { combineReducers } from 'redux';
import homesReducer from './homesReducer';
import userReducer from './userReducer';

export default combineReducers({
  homes: homesReducer,
  user: userReducer
});
