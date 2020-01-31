import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../../actions';

import './navbar.scss';

const NavBar = props => {
  const [menu, setMenu] = useState('closed');
  const [btn, setBtn] = useState('closed');

  const toggleMenu = e => {
    if (menu === 'closed') {
      setMenu('opened');
      setBtn('opened');
    } else {
      setMenu('closed');
      setBtn('closed');
    }
  };

  const loginDisplay = () => {
    if (props.isSignedIn) {
      return (
        <>
          <li className="navbar__list-item">
            <Link to="/add" className="navbar__link navbar__link--add">
              Add residence
            </Link>
          </li>
          <li className="navbar__list-item">
            <Link to="/usershomes" className="navbar__link navbar__link--login">
              Your offers
            </Link>
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
            <Link
              onClick={toggleMenu}
              to="/login"
              className="navbar__link navbar__link--login"
            >
              Login
            </Link>
          </li>
          <li className="navbar__list-item">
            <Link
              onClick={toggleMenu}
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

      <ul
        className={
          menu === 'opened' ? 'navbar__list navbar__list_open' : 'navbar__list'
        }
      >
        <li className="navbar__list-item">
          <Link onClick={toggleMenu} to="/" className="navbar__link">
            Start
          </Link>
        </li>
        <li className="navbar__list-item">
          <Link onClick={toggleMenu} to="/homes" className="navbar__link">
            Search
          </Link>
        </li>

        {loginDisplay()}
      </ul>
      <button
        onClick={toggleMenu}
        class={
          btn === 'opened'
            ? 'navbar__menu-toggler navbar__menu-toggler_open'
            : 'navbar__menu-toggler'
        }
        aria-expanded="false"
      >
        <span class="navbar__label">Open/close menu</span>
        <span class="navbar__burger"></span>
      </button>
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
