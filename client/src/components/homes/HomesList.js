import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchHomes } from '../../actions';

import Home from './Home';

import './homes-list.scss';
import HomesFilters from './HomesFilters';
import Loader from '../utils/Loader';

const HomesList = props => {
  useEffect(() => {
    props.fetchHomes(props.query);
    // eslint-disable-next-line
  }, [props.query]);

  if (props.loading)
    return (
      <div className="homes">
        <Loader />
      </div>
    );

  return (
    <div className="homes">
      {props.location.pathname === '/homes' ? (
        <HomesFilters />
      ) : (
        <h2 className="homes__heading">Your Offers:</h2>
      )}
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
    loading: state.homes.loading,
    query: state.homes.currentQuery
  };
};

export default connect(mapStateToProps, { fetchHomes })(withRouter(HomesList));
