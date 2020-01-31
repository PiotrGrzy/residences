import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

import { addHome, setLoading } from '../../actions';

import './add-home.scss';
import Loader from '../utils/Loader';

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

  if (props.current) {
    defaultValues = {
      title: props.current.title,
      country: props.current.location.country,
      city: props.current.location.city,
      street: props.current.location.street,
      rooms: props.current.rooms,
      area: props.current.area,
      floor: props.current.floor,
      price: props.current.price,
      description: props.current.description,
      built: props.current.built
    };
  }

  const { register, handleSubmit, errors, reset } = useForm({
    defaultValues
  });

  const onSubmit = data => {
    if (props.user.isSignedIn) {
      props.setLoading();
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
        <label htmlFor="title" className="addhome__label">
          Name:
        </label>
        <div className="input-wrapper">
          <input
            type="text"
            className="addhome__input"
            id="title"
            name="title"
            ref={register({ required: true, minLength: 6, maxLength: 60 })}
          />
          {errors.name && (
            <span className="form-error-info">
              Title is required, it must be 6-60 characters long.
            </span>
          )}
        </div>

        {/* <FormField
          name="title"
          error="Title is required, it must be at least 6chars long."
          validation={{ required: true, minLength: 6 }}
        /> */}

        <label htmlFor="country" className="addhome__label">
          Country:
        </label>
        <div className="input-wrapper">
          <input
            type="text"
            className="addhome__input"
            id="country"
            name="country"
            ref={register({ required: true, maxLength: 20 })}
          />
          {errors.country && (
            <span className="form-error-info">
              Country is required, maximum 20 characters long
            </span>
          )}
        </div>

        <label htmlFor="city" className="addhome__label">
          City:
        </label>
        <div className="input-wrapper">
          <input
            type="text"
            className="addhome__input"
            id="city"
            name="city"
            ref={register({ required: true, maxLength: 20 })}
          />
          {errors.city && (
            <span className="form-error-info">
              City is required, maximum 20 characters long
            </span>
          )}
        </div>

        <label htmlFor="street" className="addhome__label">
          Street:
        </label>
        <div className="input-wrapper">
          <input
            type="text"
            className="addhome__input"
            id="street"
            name="street"
            ref={register}
          />
        </div>

        <label htmlFor="rooms" className="addhome__label">
          Rooms:
        </label>
        <div className="input-wrapper">
          <input
            type="text"
            className="addhome__input"
            id="rooms"
            name="rooms"
            ref={register({
              required: true,
              pattern: /^([0-9]|[1-9][0-9]|100)$/
            })}
          />
          {errors.rooms && (
            <span className="form-error-info">Number of rooms is required</span>
          )}
        </div>

        <label htmlFor="area" className="addhome__label">
          Area:
        </label>
        <div className="input-wrapper">
          <input
            type="text"
            className="addhome__input"
            id="area"
            name="area"
            ref={register({
              required: true,
              pattern: /^\d+$/
            })}
          />
          {errors.area && (
            <span className="form-error-info">
              Area of the residence is required
            </span>
          )}
        </div>

        <label htmlFor="floor" className="addhome__label">
          floor:
        </label>
        <div className="input-wrapper">
          <input
            type="text"
            className="addhome__input"
            id="floor"
            name="floor"
            ref={register({
              required: true,
              pattern: /^\d+$/
            })}
          />
          {errors.floor && (
            <span className="form-error-info">
              Floor of the residence is required
            </span>
          )}
        </div>

        <label htmlFor="built" className="addhome__label">
          built:
        </label>
        <div className="input-wrapper">
          <input
            type="text"
            className="addhome__input"
            id="built"
            name="built"
            ref={register({
              required: true,
              pattern: /^\d+$/
            })}
          />
          {errors.built && (
            <span className="form-error-info">
              built of the residence is required
            </span>
          )}
        </div>

        <label htmlFor="price" className="addhome__label">
          Price:
        </label>
        <div className="input-wrapper">
          <input
            type="text"
            className="addhome__input"
            id="price"
            name="price"
            ref={register({
              required: true,
              pattern: /^\d+$/
            })}
          />
          {errors.price && (
            <span className="form-error-info">
              Price of the residence is required
            </span>
          )}
        </div>

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
            ref={register({ maxLength: 8 })}
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
          placeholder="description"
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
    loading: state.homes.loading
  };
};

export default connect(mapStateToProps, { addHome, setLoading })(AddHome);
