import React, { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import TripCard from '../components/TripCard';
import './UserTripListing.css';

const UserTripListing = () => {
  // Sample data - will be replaced with MongoDB data
  const [trips] = useState({
    ongoing: [
      { id: 1, name: 'Paris Adventure', date: 'Jan 15-22, 2024', summary: 'Currently exploring the City of Light' }
    ],
    upcoming: [
      { id: 2, name: 'Tokyo Discovery', date: 'Feb 10-20, 2024', summary: 'Upcoming trip to Japan' }
    ],
    completed: [
      { id: 3, name: 'NYC Getaway', date: 'Dec 5-12, 2023', summary: 'Great time in the Big Apple' },
      { id: 4, name: 'London Experience', date: 'Nov 1-8, 2023', summary: 'Royal and historic' }
    ]
  });

  const handleSearch = (query) => {
    console.log('Search query:', query);
    // TODO: Implement search functionality
  };

  return (
    <div className="trip-listing">
      <Header />
      <div className="trip-listing-content">
        <div className="trip-listing-container">
          <h1 className="page-title">My Trips</h1>

          <SearchBar 
            placeholder="Search trips..." 
            onSearch={handleSearch}
          />

          <div className="trips-categories">
            <section className="trip-category">
              <h2 className="category-title">Ongoing</h2>
              <div className="trips-grid">
                {trips.ongoing.length > 0 ? (
                  trips.ongoing.map((trip) => (
                    <TripCard key={trip.id} trip={trip} />
                  ))
                ) : (
                  <p className="empty-message">No ongoing trips</p>
                )}
              </div>
            </section>

            <section className="trip-category">
              <h2 className="category-title">Upcoming</h2>
              <div className="trips-grid">
                {trips.upcoming.length > 0 ? (
                  trips.upcoming.map((trip) => (
                    <TripCard key={trip.id} trip={trip} />
                  ))
                ) : (
                  <p className="empty-message">No upcoming trips</p>
                )}
              </div>
            </section>

            <section className="trip-category">
              <h2 className="category-title">Completed</h2>
              <div className="trips-grid">
                {trips.completed.length > 0 ? (
                  trips.completed.map((trip) => (
                    <TripCard key={trip.id} trip={trip} />
                  ))
                ) : (
                  <p className="empty-message">No completed trips</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTripListing;

