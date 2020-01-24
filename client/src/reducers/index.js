import { combineReducers } from 'redux';
import homesReducer from './homesReducer';

export default combineReducers({
  homes: homesReducer
});
