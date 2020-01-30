import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { loginUser } from '../../actions';

import './login.scss';

const Login = props => {
  const defaultValues = {
    email: '',
    password: ''
  };

  const { register, handleSubmit, errors } = useForm({
    defaultValues
  });

  const onSubmit = data => {
    props.loginUser(data);
    //reset(defaultValues);
  };

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className="login__label">
          Email:
        </label>
        <input
          type="email"
          className="login__input"
          id="email"
          name="email"
          ref={register({ required: true })}
        />
        {errors.email && <span>This field is required</span>}
        <label htmlFor="password" className="login__label">
          Password:
        </label>
        <input
          type="password"
          className="login__input"
          id="password"
          name="password"
          ref={register({ required: true })}
        />
        {errors.password && <span>This field is required</span>}
        <button className="login__btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default connect(null, { loginUser })(Login);
