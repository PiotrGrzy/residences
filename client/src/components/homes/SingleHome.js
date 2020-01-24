import React, { useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import { connect } from 'react-redux';
import { fetchSingleHome } from '../../actions';

import './single-home.scss';
import './image-gallery.scss';

const SingleHome = props => {
  useEffect(() => {
    props.fetchSingleHome(props.match.params.id);
  }, []);

  if (props.current.title) {
    const {
      _id,
      images,
      title,
      rooms,
      area,
      price,
      location,
      date,
      build,
      floor,
      owner,
      description
    } = props.current;
    const galleryItems = images.map(image => {
      const item = {
        original: image,
        thumbnail: image
      };
      return item;
    });

    return (
      <div className="single">
        <ImageGallery items={galleryItems} />
        <div className="single__details">
          <h2 className="single__title">{title}</h2>
          <p className="single__price">{price} PLN</p>

          <div className="single__parameters">
            <h3 className="single__sub-heading">Offer details</h3>
            <p className="single__area">
              <i className="lni-grid"></i> Area: {area} m <sup>2</sup>
            </p>
            <p className="single__rooms">
              <i className="lni-home"></i> Rooms: {rooms}
            </p>
            <p className="single__build">
              <i className="lni-brick"></i> Build in: {build}
            </p>
            <p className="single__floor">
              <i className="lni-layers"></i> Floor: {floor}
            </p>
          </div>

          <div className="single__location">
            <h3 className="single__sub-heading">Location</h3>
            <p className="single__country">
              <i className="lni-flag"></i> Country: {location.country}
            </p>
            <p className="single__city">
              <i className="lni-map"></i> City: {location.city}
            </p>
            <p className="single__street">
              {' '}
              <i className="lni-map-marker"></i> Street: {location.street}
            </p>
          </div>

          <div className="single__owner">
            <h3 className="single__sub-heading">Contact to this offer: </h3>
            <p className="single__owner-name">
              <i className="lni-emoji-smile"></i> Owner: {owner}
            </p>
            <p className="single__owner-phone">
              {' '}
              <i className="lni-phone-handset"></i> Phone: 666-999-666
            </p>
            <div className="single__owner-email">
              {' '}
              <i className="lni-envelope"></i> email: test@test.com
            </div>
          </div>

          <p className="single__description">
            <span className="single__sub-heading">Description: </span>
            {description}
          </p>
        </div>
      </div>
    );
  } else return <div>Loading...</div>;
};

const mapStateToProps = state => {
  return {
    current: state.homes.currentHome
  };
};

export default connect(mapStateToProps, { fetchSingleHome })(SingleHome);
