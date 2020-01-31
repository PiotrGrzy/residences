import React from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setQuery } from '../../actions';
import './homes-filters.scss';

const HomesFilters = props => {
  const defaultValues = {
    areaFrom: '',
    areaTo: '',
    priceFrom: '',
    priceTo: '',
    roomsFrom: '',
    roomsTo: '',
    city: '',
    sort: '-date'
  };

  const onSubmit = values => {
    // console.log(values);

    const queryObj = {
      city: values.city ? `location.city=${values.city.toLowerCase()}` : null,
      priceFrom: values.priceFrom ? `price[gte]=${values.priceFrom}` : null,
      priceTo: values.priceTo ? `price[lte]=${values.priceTo}` : null,
      areaFrom: values.areaFrom ? `area[gte]=${values.areaFrom}` : null,
      areaTo: values.areaTo ? `area[lte]=${values.areaTo}` : null,
      roomsFrom: values.roomsFrom ? `rooms[gte]=${values.roomsFrom}` : null,
      roomsTo: values.roomsTo ? `rooms[lte]=${values.roomsTo}` : null,
      sorting: values.sort ? `sort=${values.sort}` : null
    };

    let query = '?';
    for (const item in queryObj) {
      console.log(queryObj[item]);
      if (queryObj[item]) query += queryObj[item] + '&';
    }
    //  console.log(query);
    props.setQuery(query);
  };

  const resetForm = () => {
    reset(defaultValues);
  };

  const { register, handleSubmit, reset } = useForm({
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
          defaultValue="-date"
          className="filter__select"
          name="sort"
          id="sort"
          ref={register({})}
        >
          <option className="filter__sort-option" value="area">
            'Area: Low to High'
          </option>
          <option className="filter__sort-option" value="-area">
            'Area: High to Low'
          </option>
          <option className="filter__sort-option" value="price">
            'Price: Low to High'
          </option>
          <option className="filter__sort-option" value="-price">
            'Price: High to Low'
          </option>
          <option className="filter__sort-option" value="-date">
            'From Newiest'
          </option>
          <option className="filter__sort-option" value="date">
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

export default connect(null, { setQuery })(HomesFilters);
