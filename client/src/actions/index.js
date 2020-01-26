import axios from 'axios';

import { FETCH_HOMES, FETCH_SINGLE, LOGIN_USER, REGISTER_USER } from './types';

export const fetchHomes = () => async dispatch => {
  const response = await axios.get('http://localhost:5000/api/homes');
  console.log(response);

  dispatch({ type: FETCH_HOMES, payload: response.data });
};

export const fetchSingleHome = id => async dispatch => {
  try {
    const response = await axios.get(`http://localhost:5000/api/homes/${id}`);
    console.log(response);
    dispatch({ type: FETCH_SINGLE, payload: response.data });
  } catch (err) {
    console.log(err.msg);
  }
};

export const loginUser = formData => async dispatch => {
  try {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:5000/api/auth',
      data: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    });
    dispatch({ type: LOGIN_USER, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const registerUser = formData => async dispatch => {
  try {
    console.log(formData);
    const response = await axios({
      method: 'post',
      url: 'http://localhost:5000/api/users',
      data: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    });
    console.log(response.data);

    dispatch({ type: REGISTER_USER, payload: response.data });
  } catch (err) {
    console.log(err);
  }
  // var myHeaders = new Headers();
  // myHeaders.append('Content-Type', 'application/json');

  // var raw = JSON.stringify(formData);

  // var requestOptions = {
  //   method: 'POST',
  //   headers: myHeaders,
  //   body: raw
  // };

  // fetch('127.0.0.1:5000/api/users', requestOptions)
  //   .then(response => response.text())
  //   .then(result => console.log(result))
  //   .catch(error => console.log('error', error));
};
