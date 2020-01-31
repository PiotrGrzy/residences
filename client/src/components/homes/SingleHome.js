import React, { useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import numeral from 'numeral';
import { connect } from 'react-redux';
import { fetchSingleHome, deleteHome } from '../../actions';

import './single-home.scss';
import './image-gallery.scss';

const SingleHome = props => {
  useEffect(() => {
    props.fetchSingleHome(props.match.params.id);
    // eslint-disable-next-line
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
      built,
      floor,
      owner,
      description
    } = props.current;

    const dateDisplay = date.slice(0, 10);
    const priceDisplay = numeral(price)
      .format('0,0,0')
      .replace(',', ' ');

    const galleryItems = images.map(image => {
      const item = {
        original: image,
        thumbnail: image
      };
      return item;
    });

    return (
      <div className="single">
        <ImageGallery items={galleryItems} showFullscreenButton={false} />
        <div className="single__details">
          <h2 className="single__title">{title}</h2>
          <p className="single__price">{priceDisplay} PLN</p>

          <div className="single__parameters">
            <h3 className="single__sub-heading">Offer details</h3>
            <p className="single__area">
              <i className="lni-grid"></i> Area: {area} m <sup>2</sup>
            </p>
            <p className="single__rooms">
              <i className="lni-home"></i> Rooms: {rooms}
            </p>
            <p className="single__built">
              <i className="lni-brick"></i> Built in: {built}
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
              <i className="lni-emoji-smile"></i> Owner: {owner.name}
            </p>
            <p className="single__owner-phone">
              {' '}
              <i className="lni-phone-handset"></i> Phone: {owner.phone}
            </p>
            <div className="single__owner-email">
              {' '}
              <i className="lni-envelope"></i> email: {owner.email}
            </div>
          </div>

          <p className="single__description">
            <span className="single__sub-heading">Description: </span>
            {description}
          </p>
          <p className="single__date">Added: {dateDisplay}</p>
          {owner.id !== props.currentUserId ? null : (
            <>
              <button
                onClick={() => props.deleteHome(_id)}
                className="single__btn single__btn--delete"
              >
                Delete
              </button>
              <button className="single__btn single__btn--update">
                Update
              </button>
            </>
          )}

          <a className="single__goback" onClick={() => props.history.goBack()}>
            <i className="lni-angle-double-left"></i> Back to results
          </a>
        </div>
      </div>
    );
  } else return <div>Loading...</div>;
};

const mapStateToProps = state => {
  return {
    current: state.homes.currentHome,
    currentUserId: state.user.id
  };
};

export default connect(mapStateToProps, { fetchSingleHome, deleteHome })(
  SingleHome
);
