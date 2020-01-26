import React from 'react';
import { Link } from 'react-router-dom';
import './home.scss';
const Home = ({
  home: { _id, images, title, rooms, area, price, location, date, build, floor }
}) => {
  const dateDisplay = date.slice(0, 10);

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
          <p className="home__price ">{price} PLN</p>
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
            <p className="home__build">
              <span>Build in: </span> {build}
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
