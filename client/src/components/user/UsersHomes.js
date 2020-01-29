import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setQuery } from '../../actions';

import HomesList from '../homes/HomesList';

const UsersHomes = props => {
  useEffect(() => {
    if (props.userId) {
      props.setQuery(`?user=${props.userId}`);
    } else {
      props.history.push('/homes');
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    return () => {
      props.setQuery('');
    };
  }, []);

  return (
    <div>
      <HomesList />
    </div>
  );
};

const mapStateToProps = state => {
  return { userId: state.user.id };
};

export default connect(mapStateToProps, { setQuery })(UsersHomes);
