import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  addHome,
  setLoading,
  clearCurrent,
  updateHome
} from '../../actions/homeActions';
import Loader from '../utils/Loader';

import './add-home.scss';

const AddHome = props => {
  let defaultValues = {
    title: '',
    country: 'Poland',
    city: '',
    street: '',
    rooms: '',
    area: '',
    floor: '',
    price: '',
    description: '',
    built: ''
  };

  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues
  });

  // HELPER FUNCTION GENERATING INPUT WITH VALIDATION
  const createFormField = (name, error, validation) => {
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

  const onSubmit = data => {
    if (data.images && data.images.length > 8) {
      return alert('You can upload maximum of 8 photographs');
    }

    if (props.user.isSignedIn) {
      props.setLoading();
      //ADD USERS DATA TO NEW OFFER
      const newHomeData = {
        ...data,
        owner: { ...props.user }
      };
      props.addHome(newHomeData);
      reset(defaultValues);
    } else {
      alert('U must be signed in to add new residence');
    }
  };

  if (props.loading) {
    return <Loader />;
  }

  return (
    <div className="addhome">
      <form className="addhome__form" onSubmit={handleSubmit(onSubmit)}>
        {createFormField(
          'title',
          'Title is required, it must be 6-60 characters long.',
          { required: true, maxLength: 60, minLength: 6 }
        )}

        {createFormField(
          'country',
          'Country is required, maximum 20 characters long',
          { required: true, maxLength: 20 }
        )}

        {createFormField(
          'city',
          'City is required, maximum 20 characters long',
          { required: true, maxLength: 20 }
        )}

        {createFormField('street', '', {})}
        {createFormField('rooms', 'Number of rooms is required', {
          required: true,
          pattern: /^([0-9]|[1-9][0-9]|100)$/ // ACCEPTS ONLY INTEGER 0-100
        })}

        {createFormField('area', 'Area of the residence is required', {
          required: true,
          pattern: /^\d+$/ // ACCEPTS ONLY INTEGER
        })}

        {createFormField('floor', 'Floor of the residence is required', {
          required: true,
          pattern: /^([0-9]|[1-9][0-9]|100)$/ // ACCEPTS ONLY INTEGER 0-100
        })}

        {createFormField('built', 'Built date of the residence is required', {
          required: true,
          pattern: /^\d+$/ // ACCEPTS ONLY INTEGER
        })}

        {createFormField('price', ' Price of the residence is required', {
          required: true,
          pattern: /^\d+$/ // ACCEPTS ONLY INTEGER
        })}

        <label htmlFor="images" className="addhome__label">
          Add some residence photos(max 8):
        </label>
        <div className="input-wrapper">
          <input
            className="addhome__input"
            type="file"
            accept="image/*"
            name="images"
            id="images"
            multiple
            ref={register}
          />
          {errors.images && (
            <span className="form-error-info">
              You can upload maximum of 8 images
            </span>
          )}
        </div>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          placeholder="Description of your property..."
          className="addhome__description"
          ref={register}
        ></textarea>
        <button className="addhome__btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    loading: state.homes.loading,
    current: state.homes.currentHome
  };
};

export default connect(mapStateToProps, {
  addHome,
  setLoading,
  clearCurrent,
  updateHome
})(AddHome);
