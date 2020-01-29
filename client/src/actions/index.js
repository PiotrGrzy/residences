import axios from 'axios';
import Cookies from 'js-cookie';
import { history } from '../components/App';

import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';

import {
  FETCH_HOMES,
  FETCH_SINGLE,
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  ADD_HOME,
  SET_QUERY,
  SET_USER,
  DELETE_HOME,
  SET_LOADING,
  ACTION_FAILED
} from './types';

const notification = (type, message, title, position = 'top-left') => {
  return store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: 'top',
    container: position,
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut'],
    dismiss: {
      duration: 5000,
      onScreen: true
    }
  });
};

export const setQuery = query => {
  return {
    type: SET_QUERY,
    payload: query
  };
};

export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};

export const fetchHomes = (query = '') => async dispatch => {
  console.log(query);
  try {
    const response = await axios.get(
      `http://localhost:5000/api/homes/${query}`
    );
    //console.log(response);
    const wait = await setTimeout(console.log('waited'), 5000);

    dispatch({ type: FETCH_HOMES, payload: response.data });
  } catch (err) {
    console.log(err);
  }
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
      notification(
        'success',
        'You are logged in.',
        `Welcome back ${response.data.name}`
      );
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
    notification(
      'success',
      'You have been successfully logged in',
      `Welcome ${response.data.user.name}`
    );
    history.push('/homes');
  } catch (err) {
    console.log(err);
    notification(
      'danger',
      'Check your email and password, try again',
      'Invalid email or password',
      'top-center'
    );
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
    notification(
      'success',
      'You have been successfully registered and logged in',
      `Welcome ${response.data.user.name}`
    );
    history.push('/homes');
  } catch (err) {
    console.log(err);
    notification(
      'danger',
      'Check your data and try again',
      'Something went wrong',
      'top-center'
    );
  }
};

export const logoutUser = () => {
  Cookies.remove('token');
  history.push('/homes');
  notification('info', 'Logout successful', 'You have been logged out');
  return { type: LOGOUT_USER };
};

export const addHome = data => async dispatch => {
  try {
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
      url: 'http://localhost:5000/api/homess',
      data: formdata,
      headers: {
        'x-auth-token': token,
        'Content-Type': 'multipart/form-data'
      }
    });

    dispatch({ type: ADD_HOME, payload: response.data });
    history.push('/usershomes');
    notification('success', 'New home offer added successfully!', `Success`);
  } catch (err) {
    console.log(err);
    dispatch({ type: ACTION_FAILED });
    notification(
      'warning',
      'Something went wrong, the offer wasnt added to database',
      `We are sorry`
    );
  }
};

export const deleteHome = id => async dispatch => {
  const token = Cookies.get('token');
  try {
    await axios.delete(`http://localhost:5000/api/homes/${id}`, {
      headers: {
        'x-auth-token': token
      }
    });
    dispatch({ type: DELETE_HOME, payload: id });
    notification('info', 'Offer has been successfully deleted', `Deleted`);
    history.push('/usershomes');
  } catch (err) {
    console.log(err);
    notification(
      'warning',
      'Something went wrong, we werent able to delete this offer',
      `We are sorry`
    );
  }
};

export const updateHome = id => async dispatch => {
  console.log(id);
};
