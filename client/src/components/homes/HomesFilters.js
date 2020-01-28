import React from 'react';
import { useForm } from 'react-hook-form';
import './homes-filters.scss';

const HomesFilters = () => {
  const sortOptions = [
    'Price: Low to High',
    'Price: High to Low',
    'Area: High to Low',
    'Area: Low to Hign',
    'Added: from Newiest',
    'Added: from Oldest'
  ];

  const defaultValues = {
    areaFrom: '',
    areaTo: '',
    priceFrom: '',
    priceTo: '',
    roomsFrom: '',
    roomsTo: '',
    city: ''
  };

  const onSubmit = values => {
    console.log(values);
  };

  const resetForm = () => {
    reset(defaultValues);
  };

  const { register, handleSubmit, watch, errors, reset } = useForm({
    defaultValues
  });

  return (
    <div className="filter">
      <form className="filter__form" onSubmit={handleSubmit(onSubmit)}>
        <label className="filter__label" htmlFor="areaFrom">
          Area from:
        </label>
        <input
          type="text"
          className="filter__input"
          id="areaFrom"
          name="areaFrom"
          ref={register({})}
        />
        <label className="filter__label" htmlFor="areaTo">
          Area to:
        </label>
        <input
          type="text"
          className="filter__input"
          id="areaTo"
          name="areaTo"
          ref={register({})}
        />
        <label className="filter__label" htmlFor="priceFrom">
          Price from:
        </label>
        <input
          type="text"
          className="filter__input"
          id="priceFrom"
          name="priceFrom"
          ref={register({})}
        />
        <label className="filter__label" htmlFor="priceTo">
          Price to:
        </label>
        <input
          type="text"
          className="filter__input"
          id="priceTo"
          name="priceTo"
          ref={register({})}
        />
        <label className="filter__label" htmlFor="roomsFrom">
          Rooms from:
        </label>
        <input
          type="text"
          className="filter__input"
          id="roomsFrom"
          name="roomsFrom"
          ref={register({})}
        />
        <label className="filter__label" htmlFor="roomsTo">
          Rooms to:
        </label>
        <input
          type="text"
          className="filter__input"
          id="roomsTo"
          name="roomsTo"
          ref={register({})}
        />
        <label className="filter__label" htmlFor="city">
          City:
        </label>
        <input
          type="text"
          className="filter__input"
          id="city"
          name="city"
          ref={register({})}
        />
        <label htmlFor="sort" className="filter__label">
          Sort by:
        </label>
        <select
          defaultValue="added-up"
          className="filter__select"
          name="sort"
          id="sort"
          ref={register({})}
        >
          <option className="filter__sort-option" value="area-up">
            'Area: Low to High'
          </option>
          <option className="filter__sort-option" value="area-down">
            'Area: High to Low'
          </option>
          <option className="filter__sort-option" value="price-up">
            'Price: Low to High'
          </option>
          <option className="filter__sort-option" value="price-down">
            'Price: High to Low'
          </option>
          <option className="filter__sort-option" value="added-up">
            'From Newiest'
          </option>
          <option className="filter__sort-option" value="added-down">
            'From Oldest'
          </option>
        </select>
        <button onClick={resetForm} className="filter__btn filter__btn--reset">
          Reset Filters
        </button>
        <button type="submit" className="filter__btn filter__btn--search">
          Search
        </button>
      </form>
    </div>
  );
};

export default HomesFilters;
