import axios from 'axios';
import Cookies from 'js-cookie';
import { history } from '../components/App';

import notification from '../components/utils/Notification';

import { LOGIN_USER, REGISTER_USER, LOGOUT_USER, SET_USER } from './types';

export const getUser = () => async dispatch => {
  const token = Cookies.get('token');
  if (token) {
    try {
      const response = await axios.get('http://localhost:5000/api/auth', {
        headers: {
          'x-auth-token': token
        }
      });

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
