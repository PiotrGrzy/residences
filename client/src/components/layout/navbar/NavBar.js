import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions';

import './navbar.scss';

const NavBar = props => {
  console.log(props.isSignedIn, props.userName);
  const loginDisplay = () => {
    if (props.isSignedIn) {
      return (
        <>
          <li className="navbar__list-item">
            <span>Welcome {props.userName}</span>
          </li>
          <li className="navbar__list-item">
            <button onClick={props.logoutUser} className="navbar__logout">
              LogOut <i className="lni-shift-right"></i>
            </button>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="navbar__list-item">
            <Link to="/login" className="navbar__link navbar__link--login">
              Login
            </Link>
          </li>
          <li className="navbar__list-item">
            <Link
              to="/register"
              className="navbar__link navbar__link--register"
            >
              Register
            </Link>
          </li>
        </>
      );
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">
        <img
          src="https://homes-images.s3.eu-west-2.amazonaws.com/logo-2.png"
          alt="logo"
        />
      </Link>

      <ul className="navbar__list">
        <li className="navbar__list-item">
          <Link to="/" className="navbar__link">
            Start
          </Link>
        </li>
        <li className="navbar__list-item">
          <Link to="/homes" className="navbar__link">
            Search
          </Link>
        </li>
        <li className="navbar__list-item">
          <Link to="/add" className="navbar__link">
            Add residence
          </Link>
        </li>
        {loginDisplay()}
      </ul>
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    isSignedIn: state.user.isSignedIn,
    userName: state.user.name
  };
};

export default connect(mapStateToProps, { logoutUser })(NavBar);
