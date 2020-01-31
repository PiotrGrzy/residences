import React from 'react';
import { Link } from 'react-router-dom';
import './home.scss';
import numeral from 'numeral';

const Home = ({
  home: { _id, images, title, rooms, area, price, location, date, built, floor }
}) => {
  const dateDisplay = date.slice(0, 10);
  const priceDisplay = numeral(price)
    .format('0,0,0')
    .replace(',', ' ');
  return (
    <li>
      <Link className="home" to={`homes/${_id}`}>
        <div className="home__img-box">
          <img
            src={
              images[0]
                ? images[0]
                : 'https://homes-images.s3.eu-west-2.amazonaws.com/no_image.png'
            }
            alt=""
            className="home__img"
          />
        </div>
        <div className="home__data">
          <h2 className="home__title">{title}</h2>
          <p className="home__price ">{priceDisplay} PLN</p>
          <p className="home__location">
            {location.country}, {location.city}, {location.street}
          </p>
          <div className="home__grid">
            <p className="home__rooms">
              <span>Rooms: </span> {rooms}
            </p>
            <p className="home__area">
              <span>Area: </span> {area} m <sup>2</sup>
            </p>
            <p className="home__floor">
              <span>Floor: </span> {floor}
            </p>
            <p className="home__built">
              <span>Built in: </span> {built}
            </p>
          </div>
          <p className="home__date">
            <span>Added: </span> {dateDisplay}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default Home;
