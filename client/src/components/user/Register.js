import React from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions';
import { useForm } from 'react-hook-form';
import './register.scss';

const Register = props => {
  const defaultValues = {
    name: '',
    email: '',
    phone: '',
    password: ''
  };

  const { register, handleSubmit, watch, errors, reset } = useForm({
    defaultValues
  });

  const onSubmit = data => {
    props.registerUser(data);
    reset(defaultValues);
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit(onSubmit)} className="register__form">
        <label htmlFor="name" className="register__label">
          Name:
        </label>
        <input
          type="text"
          className="register__input"
          id="name"
          name="name"
          ref={register({ required: true, maxLength: 20, minLength: 3 })}
        />
        {errors.name && <span>Name is required</span>}
        <label htmlFor="phone" className="register__label">
          Phone number:
        </label>
        <input
          type="text"
          className="register__input"
          id="phone"
          name="phone"
          ref={register({ required: true, minLength: 9 })}
        />
        {errors.phone && <span>Phone number is required, min 9 digits</span>}
        <label htmlFor="email" className="register__label">
          Email:
        </label>
        <input
          type="email"
          className="register__input"
          id="email"
          name="email"
          ref={register({
            required: true,
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          })}
        />
        {errors.email && <span>A valid email adress is required</span>}
        <label htmlFor="password" className="register__label">
          Password:
        </label>
        <input
          type="password"
          className="register__input"
          id="password"
          name="password"
          ref={register({ required: true, minLength: 6 })}
        />
        {errors.password && (
          <span>A password with min. 6 chars is required</span>
        )}
        <button className="register__btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default connect(null, { registerUser })(Register);
