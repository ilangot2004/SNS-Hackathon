import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './CreateNewTrip.css';

const CreateNewTrip = () => {
  const [formData, setFormData] = useState({
    place: '',
    startDate: '',
    endDate: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Save trip to Firebase
      const tripData = {
        name: formData.place,
        place: formData.place,
        startDate: formData.startDate,
        endDate: formData.endDate,
        userId: 'current-user-id' // Will be replaced with actual user ID from auth
      };
      console.log('Trip data:', tripData);
      // Navigate to build itinerary page with trip ID
      const tripId = 'temp-id'; // Replace with actual trip ID from DB
      navigate(`/trips/${tripId}/build`);
    } catch (error) {
      console.error('Error creating trip:', error);
    }
  };

  // Sample suggestions - will be replaced with actual data
  const suggestions = [
    { id: 1, name: 'Eiffel Tower', type: 'attraction' },
    { id: 2, name: 'Louvre Museum', type: 'attraction' },
    { id: 3, name: 'Notre-Dame', type: 'attraction' },
    { id: 4, name: 'Montmartre', type: 'neighborhood' },
    { id: 5, name: 'Seine River Cruise', type: 'activity' },
    { id: 6, name: 'Versailles', type: 'day-trip' }
  ];

  return (
    <div className="create-trip">
      <Header />
      <div className="create-trip-content">
        <div className="create-trip-container">
          <h1 className="page-title">Plan a New Trip</h1>

          <form onSubmit={handleSubmit} className="trip-form">
            <h2 className="form-section-title">Plan a new trip</h2>
            
            <div className="form-group">
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="place">Select a Place:</label>
              <input
                type="text"
                id="place"
                name="place"
                value={formData.place}
                onChange={handleChange}
                placeholder="Enter destination"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Continue to Build Itinerary
            </button>
          </form>

          <section className="suggestions-section">
            <h2 className="section-title">Suggestion for Places to Visit/Activites to preform</h2>
            <div className="suggestions-grid">
              {suggestions.map((item) => (
                <div key={item.id} className="suggestion-card">
                  <h3>{item.name}</h3>
                  <p className="suggestion-type">{item.type}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CreateNewTrip;

