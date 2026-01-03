import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import TripCard from '../components/TripCard';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  // Sample data - will be replaced with MongoDB data
  const topRegionalSelections = [
    { id: 1, name: 'Paris' },
    { id: 2, name: 'Tokyo' },
    { id: 3, name: 'New York' },
    { id: 4, name: 'London' },
    { id: 5, name: 'Dubai' }
  ];

  const previousTrips = [
    { id: 1, name: 'Paris Adventure', date: 'Jan 15-22, 2024', summary: 'Amazing trip to the City of Light' },
    { id: 2, name: 'Tokyo Discovery', date: 'Feb 10-20, 2024', summary: 'Exploring Japanese culture and cuisine' },
    { id: 3, name: 'NYC Getaway', date: 'Mar 5-12, 2024', summary: 'City that never sleeps' }
  ];

  return (
    <div className="dashboard">
      <Header />
      <div className="dashboard-content">
        <div className="banner-section">
          <div className="banner-image">
            <h2>Discover Your Next Adventure</h2>
          </div>
        </div>

        <div className="dashboard-container">
          <SearchBar placeholder="Search destinations, activities..." />

          <section className="top-regional-section">
            <h2 className="section-title">Top Regional Selections</h2>
            <div className="regional-grid">
              {topRegionalSelections.map((destination) => (
                <div key={destination.id} className="regional-card">
                  <h3>{destination.name}</h3>
                </div>
              ))}
            </div>
          </section>

          <section className="previous-trips-section">
            <h2 className="section-title">Previous Trips</h2>
            <div className="trips-grid">
              {previousTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </section>

          <div className="plan-trip-section">
            <button 
              className="plan-trip-button"
              onClick={() => navigate('/trips/new')}
            >
              + Plan a trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

