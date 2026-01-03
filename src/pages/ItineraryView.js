import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import './ItineraryView.css';

const ItineraryView = () => {
  const { tripId } = useParams();
  // tripId will be used when connecting to MongoDB
  
  // Sample data - will be replaced with MongoDB data
  const itinerary = {
    tripName: 'Paris Adventure',
    days: [
      {
        day: 1,
        activities: [
          { activity: 'Arrival at CDG Airport', expense: '$50' },
          { activity: 'Hotel Check-in', expense: '$150' },
          { activity: 'Evening walk in Montmartre', expense: '$20' }
        ]
      },
      {
        day: 2,
        activities: [
          { activity: 'Visit Eiffel Tower', expense: '$30' },
          { activity: 'Lunch at local restaurant', expense: '$45' },
          { activity: 'Louvre Museum Tour', expense: '$25' }
        ]
      },
      {
        day: 3,
        activities: [
          { activity: 'Seine River Cruise', expense: '$35' },
          { activity: 'Notre-Dame visit', expense: '$0' },
          { activity: 'Dinner at fine dining', expense: '$120' }
        ]
      }
    ]
  };

  const calculateTotal = () => {
    return itinerary.days.reduce((total, day) => {
      return total + day.activities.reduce((dayTotal, activity) => {
        const expense = parseInt(activity.expense.replace('$', ''));
        return dayTotal + (isNaN(expense) ? 0 : expense);
      }, 0);
    }, 0);
  };

  return (
    <div className="itinerary-view">
      <Header />
      <div className="itinerary-view-content">
        <div className="itinerary-view-container">
          <h1 className="page-title">Itinerary for {itinerary.tripName}</h1>

          <SearchBar placeholder="Search activities..." />

          <div className="itinerary-days">
            {itinerary.days.map((day) => (
              <div key={day.day} className="day-section">
                <h2 className="day-title">Day {day.day}</h2>
                <div className="activities-container">
                  <div className="activities-column">
                    <h3 className="column-header">Physical Activity</h3>
                    <div className="activities-list">
                      {day.activities.map((item, index) => (
                        <div key={index} className="activity-item">
                          <div className="activity-connector">
                            {index < day.activities.length - 1 && <div className="connector-line"></div>}
                            <div className="activity-dot"></div>
                          </div>
                          <div className="activity-content">
                            <p className="activity-text">{item.activity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="expenses-column">
                    <h3 className="column-header">Expense</h3>
                    <div className="expenses-list">
                      {day.activities.map((item, index) => (
                        <div key={index} className="expense-item">
                          <p className="expense-text">{item.expense}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="budget-summary">
            <div className="total-budget">
              <span className="total-label">Total Budget:</span>
              <span className="total-amount">${calculateTotal()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryView;

