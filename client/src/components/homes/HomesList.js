import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchHomes } from '../../actions';

import Home from './Home';

import './homes-list.scss';
import HomesFilters from './HomesFilters';

const HomesList = props => {
  useEffect(() => {
    props.fetchHomes(props.query);
  }, [props.query]);
  return (
    <div className="homes">
      <HomesFilters />
      {props.homes.length <= 0 ? (
        <h2 style={{ textAlign: 'center' }}>No results found</h2>
      ) : (
        <ul className="homes__list">
          {props.homes.map(home => (
            <Home key={home._id} home={home} />
          ))}
        </ul>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    homes: state.homes.list,
    query: state.homes.currentQuery
  };
};

export default connect(mapStateToProps, { fetchHomes })(HomesList);
