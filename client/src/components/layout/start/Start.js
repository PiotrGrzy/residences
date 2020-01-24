import React from 'react';
import { Link } from 'react-router-dom';
import './start.scss';
const Start = () => {
  return (
    <div className="start">
      <div className="start__welcome">
        <h1 className="start__heading">Welcome to Premium Residences</h1>
        <Link to="homes" className="start__link">
          Start Now{' '}
        </Link>
      </div>
    </div>
  );
};

export default Start;
