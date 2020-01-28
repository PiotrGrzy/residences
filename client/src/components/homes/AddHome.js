import React from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';

import { addHome } from '../../actions';

import './add-home.scss';

const AddHome = props => {
  const defaultValues = {
    title: '',
    country: 'Poland',
    city: '',
    street: '',
    rooms: '',
    area: '',
    floor: '',
    price: '',
    description: '',
    build: ''
  };

  const { register, handleSubmit, watch, errors, reset } = useForm({
    defaultValues
  });

  const onSubmit = data => {
    if (props.user.isSignedIn) {
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
            ref={register({ required: true, minLength: 6 })}
          />
          {errors.name && (
            <span className="form-error-info">
              Title is required, it must be at least 6chars long.
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
            ref={register({ required: true })}
          />
          {errors.country && (
            <span className="form-error-info">Country is required</span>
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
            ref={register({ required: true })}
          />
          {errors.city && (
            <span className="form-error-info">City is required</span>
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

        <label htmlFor="build" className="addhome__label">
          Build:
        </label>
        <div className="input-wrapper">
          <input
            type="text"
            className="addhome__input"
            id="build"
            name="build"
            ref={register({
              required: true,
              pattern: /^\d+$/
            })}
          />
          {errors.build && (
            <span className="form-error-info">
              build of the residence is required
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
          Add some residence photos:
        </label>
        <input
          className="addhome__input"
          type="file"
          name="images"
          id="images"
          multiple
          ref={register}
        />
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
    user: state.user
  };
};

export default connect(mapStateToProps, { addHome })(AddHome);
