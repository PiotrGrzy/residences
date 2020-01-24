import React from 'react';

import './register.scss';

const Register = () => {
  return (
    <div className="register">
      <form action="" className="register__form">
        <label htmlFor="name" className="register__label">
          Name:
        </label>
        <input
          type="text"
          required
          className="register__input"
          id="name"
          name="name"
        />
        <label htmlFor="phone" className="register__label">
          Phone number:
        </label>
        <input
          type="text"
          required
          className="register__input"
          id="phone"
          name="phone"
        />
        <label htmlFor="email" className="register__label">
          Email:
        </label>
        <input
          type="email"
          required
          className="register__input"
          id="email"
          name="email"
        />
        <label htmlFor="password" className="register__label">
          Password:
        </label>
        <input
          type="password"
          required
          className="register__input"
          id="password"
          name="password"
        />
        <button className="register__btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
