import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setQuery } from '../../actions';

import HomesList from '../homes/HomesList';

const UsersHomes = props => {
  useEffect(() => {
    props.setQuery(`?user=${props.userId}`);
  }, []);

  useEffect(() => {
    return () => {
      props.setQuery('');
    };
  }, []);

  return (
    <div>
      <h2>Your Offers</h2>
      <HomesList />
    </div>
  );
};

const mapStateToProps = state => {
  return { userId: state.user.id };
};

export default connect(mapStateToProps, { setQuery })(UsersHomes);
