import React from 'react';

import './add-home.scss';

const AddHome = () => {
  return (
    <div className="addhome">
      <form action="" className="addhome__form">
        <label htmlFor="title" className="addhome__label">
          Name:
        </label>
        <input
          type="text"
          required
          className="addhome__input"
          id="title"
          name="title"
        />
        <label htmlFor="phone" className="addhome__label">
          Country:
        </label>
        <input
          type="text"
          required
          className="addhome__input"
          id="contry"
          name="contry"
          value="Poland"
        />
        <label htmlFor="city" className="addhome__label">
          City:
        </label>
        <input
          type="city"
          required
          className="addhome__input"
          id="city"
          name="city"
        />
        <label htmlFor="street" className="addhome__label">
          Street:
        </label>
        <input
          type="street"
          required
          className="addhome__input"
          id="street"
          name="street"
        />

        <label htmlFor="rooms" className="addhome__label">
          Rooms:
        </label>
        <input
          type="rooms"
          required
          className="addhome__input"
          id="rooms"
          name="rooms"
        />

        <label htmlFor="area" className="addhome__label">
          Area:
        </label>
        <input
          type="area"
          required
          className="addhome__input"
          id="area"
          name="area"
        />

        <label htmlFor="floor" className="addhome__label">
          floor:
        </label>
        <input
          type="floor"
          required
          className="addhome__input"
          id="floor"
          name="floor"
        />
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          placeholder="description"
          className="addhome__description"
        ></textarea>

        <button className="addhome__btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddHome;
