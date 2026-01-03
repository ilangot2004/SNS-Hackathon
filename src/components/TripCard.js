import React from 'react';
import { Link } from 'react-router-dom';
import './TripCard.css';

const TripCard = ({ trip, showViewButton = false }) => {
  return (
    <div className="trip-card">
      <div className="trip-card-content">
        <h3 className="trip-card-title">{trip.name || 'Trip Name'}</h3>
        {trip.date && (
          <p className="trip-card-date">{trip.date}</p>
        )}
        {trip.summary && (
          <p className="trip-card-summary">{trip.summary}</p>
        )}
        {trip.description && (
          <p className="trip-card-description">{trip.description}</p>
        )}
      </div>
      {showViewButton && (
        <Link to={`/trips/${trip.id || trip._id}`} className="trip-card-view-btn">
          View
        </Link>
      )}
    </div>
  );
};

export default TripCard;

