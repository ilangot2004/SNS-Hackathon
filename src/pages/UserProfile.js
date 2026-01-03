import React, { useState } from 'react';
import Header from '../components/Header';
import TripCard from '../components/TripCard';
import './UserProfile.css';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    city: 'New York',
    country: 'USA'
  });

  // Sample data - will be replaced with MongoDB data
  const preplannedTrips = [
    { id: 1, name: 'Paris Adventure', date: 'Jan 15-22, 2024' },
    { id: 2, name: 'Tokyo Discovery', date: 'Feb 10-20, 2024' },
    { id: 3, name: 'Barcelona Escape', date: 'Mar 5-12, 2024' }
  ];

  const previousTrips = [
    { id: 4, name: 'NYC Getaway', date: 'Dec 5-12, 2023' },
    { id: 5, name: 'London Experience', date: 'Nov 1-8, 2023' },
    { id: 6, name: 'Rome Adventure', date: 'Oct 10-17, 2023' }
  ];

  return (
    <div className="user-profile">
      <Header />
      <div className="user-profile-content">
        <div className="user-profile-container">
          <h1 className="page-title">My Profile</h1>

          <div className="profile-section">
            <div className="profile-image-section">
              <div className="profile-image-placeholder">
                <span>Image of the User</span>
              </div>
            </div>
            <div className="profile-details-section">
              <div className="profile-details-header">
                <h2>User Details</h2>
                <button 
                  className="edit-button"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? 'Save' : 'Edit'}
                </button>
              </div>
              <div className="user-details-content">
                {isEditing ? (
                  <div className="edit-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>First Name</label>
                        <input type="text" defaultValue={userDetails.firstName} />
                      </div>
                      <div className="form-group">
                        <label>Last Name</label>
                        <input type="text" defaultValue={userDetails.lastName} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input type="email" defaultValue={userDetails.email} />
                    </div>
                    <div className="form-group">
                      <label>Phone</label>
                      <input type="tel" defaultValue={userDetails.phone} />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>City</label>
                        <input type="text" defaultValue={userDetails.city} />
                      </div>
                      <div className="form-group">
                        <label>Country</label>
                        <input type="text" defaultValue={userDetails.country} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="details-display">
                    <p><strong>Name:</strong> {userDetails.firstName} {userDetails.lastName}</p>
                    <p><strong>Email:</strong> {userDetails.email}</p>
                    <p><strong>Phone:</strong> {userDetails.phone}</p>
                    <p><strong>Location:</strong> {userDetails.city}, {userDetails.country}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <section className="trips-section">
            <h2 className="section-title">Preplanned Trips</h2>
            <div className="trips-grid">
              {preplannedTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} showViewButton={true} />
              ))}
            </div>
          </section>

          <section className="trips-section">
            <h2 className="section-title">Previous Trips</h2>
            <div className="trips-grid">
              {previousTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} showViewButton={true} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

