import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  SET_USER
} from '../actions/types';

const initialState = {
  isSignedIn: false,
  id: null,
  name: null,
  email: null,
  phone: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
    case REGISTER_USER: {
      const { _id, name, email, phone } = action.payload.user;
      return {
        isSignedIn: true,
        id: _id,
        name,
        email,
        phone
      };
    }
    case SET_USER: {
      const { id, name, email, phone } = action.payload;
      return {
        isSignedIn: true,
        id: id,
        name,
        email,
        phone
      };
    }
    case LOGOUT_USER: {
      return initialState;
    }

    default:
      return state;
  }
};
