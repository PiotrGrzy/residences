import React from 'react';

import './footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <span className="footer__copy">Copyright 2020 &copy;</span>
      <span className="footer__authors">
        Author:
        <a href="mailto:piotr.grzymowicz1@gmail.com" className="footer__link">
          Piotr Grzymowicz
        </a>
      </span>
    </footer>
  );
};

export default Footer;
