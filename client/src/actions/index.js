import axios from 'axios';

import { FETCH_HOMES, FETCH_SINGLE } from './types';

export const fetchHomes = () => async dispatch => {
  const response = await axios.get('http://localhost:5000/api/homes');
  console.log(response);

  dispatch({ type: FETCH_HOMES, payload: response.data });
};

export const fetchSingleHome = id => async dispatch => {
  const response = await axios.get(`http://localhost:5000/api/homes/${id}`);
  console.log(response);
  dispatch({ type: FETCH_SINGLE, payload: response.data });
};
