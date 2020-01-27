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
    //formdata.append('images', data.images);
    // formdata.append(
    //   'images',
    //   data.images[0],
    //   '/C:/Users/Piotr/Downloads/m100.jpg'
    // );

    //formdata.append('images', data.images);

    //form.append('data', data);

    const response = await axios({
      method: 'post',
      url: 'http://localhost:5000/api/homes',
      data: formdata,
      headers: {
        'x-auth-token':
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWUyODJhMTM1YmU2NjUyMTM4MDAwOGZlIiwibmFtZSI6IlBpb3RyIiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIiwicGhvbmUiOiI5OTktMDAwLTk5OSJ9LCJpYXQiOjE1ODAxMjIyNTAsImV4cCI6MTU4MDE1ODI1MH0.zdmh5NHt4ZjR-u3YrvC433SzQxcIjnWSGTBOgT8z4xs',
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};
