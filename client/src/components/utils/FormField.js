import React from 'react';
//import { useForm } from 'react-hook-form';

const FormField = ({ name, error, validation }) => {
  //const { register, errors } = useForm();
  return (
    <>
      <label htmlFor={name} className="addhome__label">
        {name}
      </label>
      <div className="input-wrapper">
        <input
          type="text"
          className="addhome__input"
          id={name}
          name={name}
          ref={register(validation)}
        />
        {errors[name] && <span className="form-error-info">{error}</span>}
      </div>
    </>
  );
};

export default FormField;
