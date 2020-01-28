import axios from 'axios';
import Cookies from 'js-cookie';
import { history } from '../components/App';
import {
  SET_LOADING,
  FETCH_HOMES,
  FETCH_SINGLE,
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  ADD_HOME,
  SET_QUERY,
  SET_USER
} from './types';

export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};

export const setQuery = query => {
  return {
    type: SET_QUERY,
    payload: query
  };
};

export const fetchHomes = (query = '') => async dispatch => {
  console.log(query);
  const response = await axios.get(`http://localhost:5000/api/homes/${query}`);
  //console.log(response);

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

export const getUser = () => async dispatch => {
  const token = Cookies.get('token');
  if (token) {
    try {
      const response = await axios.get('http://localhost:5000/api/auth', {
        headers: {
          'x-auth-token': token
        }
      });
      console.log(response.data);
      dispatch({ type: SET_USER, payload: response.data });
    } catch (err) {
      console.log(err);
    }
  } else return;
};

export const loginUser = formData => async dispatch => {
  try {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:5000/api/auth',
      data: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    });

    Cookies.set('token', response.data.token);
    dispatch({ type: LOGIN_USER, payload: response.data });
    history.push('/homes');
  } catch (err) {
    console.log(err);
  }
};

export const registerUser = formData => async dispatch => {
  try {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:5000/api/users',
      data: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' }
    });

    Cookies.set('token', response.data.token);
    dispatch({ type: REGISTER_USER, payload: response.data });
    history.push('/homes');
  } catch (err) {
    console.log(err);
  }
};

export const logoutUser = () => {
  Cookies.remove('token');
  return { type: LOGOUT_USER };
};

export const addHome = data => async dispatch => {
  try {
    console.log(data);

    const formdata = new FormData();
    formdata.append('title', data.title);
    formdata.append('rooms', data.rooms);
    formdata.append('area', data.area);
    formdata.append('floor', data.floor);
    formdata.append('location[country]', data.country);
    formdata.append('location[city]', data.city);
    formdata.append('location[street]', data.street);
    formdata.append('description', data.description);
    formdata.append('price', data.price);
    formdata.append('build', data.build);
    formdata.append('owner[id]', data.owner.id);
    formdata.append('owner[name]', data.owner.name);
    formdata.append('owner[phone]', data.owner.phone);
    formdata.append('owner[email]', data.owner.email);
    console.log(data.images);

    [...data.images].forEach(image => formdata.append('images', image));
    const token = Cookies.get('token');

    const response = await axios({
      method: 'post',
      url: 'http://localhost:5000/api/homes',
      data: formdata,
      headers: {
        'x-auth-token': token,
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log(response.data);
    dispatch({ type: ADD_HOME, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};
