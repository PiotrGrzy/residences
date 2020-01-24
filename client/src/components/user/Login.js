import React from 'react';

import './login.scss';

const Login = () => {
  return (
    <div className="login">
      <form action="" className="login__form">
        <label htmlFor="email" className="login__label">
          Email:
        </label>
        <input
          type="email"
          required
          className="login__input"
          id="email"
          name="email"
        />
        <label htmlFor="password" className="login__label">
          Password:
        </label>
        <input
          type="password"
          required
          className="login__input"
          id="password"
          name="password"
        />
        <button className="login__btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
