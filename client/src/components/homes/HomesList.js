import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchHomes } from '../../actions';

import Home from './Home';

import './homes-list.scss';

const HomesList = props => {
  useEffect(() => {
    props.fetchHomes();
  }, []);

  return (
    <div className="homes">
      <ul className="homes__list">
        {props.homes.map(home => (
          <Home key={home._id} home={home} />
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    homes: state.homes.list
  };
};

export default connect(mapStateToProps, { fetchHomes })(HomesList);
