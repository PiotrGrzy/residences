import React, { ReactFragment as Fragment } from 'react';
import { Link } from 'react-router-dom';

import './navbar.scss';

const NavBar = () => {
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
          <Link to="/homes" className="navbar__link">
            Search
          </Link>
          <Link to="/add" className="navbar__link">
            Add residence
          </Link>
          <Link to="/login" className="navbar__link navbar__link--login">
            Login
          </Link>
          <Link to="/register" className="navbar__link navbar__link--register">
            Register
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
