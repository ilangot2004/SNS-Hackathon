import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import './CalendarView.css';

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 0, 1)); // January 2024

  // Sample trip data - will be replaced with MongoDB data
  const trips = [
    {
      id: 1,
      name: 'PARIS TRIP',
      startDate: new Date(2024, 0, 4), // Jan 4
      endDate: new Date(2024, 0, 9), // Jan 9
      color: '#3b82f6'
    },
    {
      id: 2,
      name: 'NYC - GETAWAY',
      startDate: new Date(2024, 0, 14), // Jan 14
      endDate: new Date(2024, 0, 16), // Jan 16
      color: '#10b981'
    },
    {
      id: 3,
      name: 'JAPAN ADVENTURE',
      startDate: new Date(2024, 0, 16), // Jan 16
      endDate: new Date(2024, 0, 22), // Jan 22
      color: '#f59e0b'
    },
    {
      id: 4,
      name: 'NYC GETAWAY',
      startDate: new Date(2024, 0, 28), // Jan 28
      endDate: new Date(2024, 0, 28), // Jan 28
      color: '#10b981'
    }
  ];

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get first day of week for the month
  const firstDayOfWeek = monthStart.getDay();
  const daysArray = Array(firstDayOfWeek).fill(null).concat(daysInMonth.map(day => day));

  const getTripsForDate = (date) => {
    return trips.filter(trip => {
      const tripStart = new Date(trip.startDate);
      const tripEnd = new Date(trip.endDate);
      tripStart.setHours(0, 0, 0, 0);
      tripEnd.setHours(23, 59, 59, 999);
      date.setHours(0, 0, 0, 0);
      return date >= tripStart && date <= tripEnd;
    });
  };

  const goToPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleSearch = (query) => {
    console.log('Search query:', query);
    // TODO: Implement search functionality
  };

  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <div className="calendar-view">
      <Header />
      <div className="calendar-view-content">
        <div className="calendar-view-container">
          <h1 className="page-title">Calendar View</h1>

          <SearchBar 
            placeholder="Search trips..." 
            onSearch={handleSearch}
          />

          <div className="calendar-header">
            <h2 className="calendar-month-title">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <div className="calendar-nav">
              <button onClick={goToPreviousMonth} className="nav-button">
                ←
              </button>
              <button onClick={goToNextMonth} className="nav-button">
                →
              </button>
            </div>
          </div>

          <div className="calendar-grid">
            <div className="calendar-weekdays">
              {weekDays.map(day => (
                <div key={day} className="weekday-header">
                  {day}
                </div>
              ))}
            </div>

            <div className="calendar-days">
              {daysArray.map((day, index) => {
                if (day === null) {
                  return <div key={`empty-${index}`} className="calendar-day empty"></div>;
                }

                const dayTrips = getTripsForDate(new Date(day));
                const isCurrentMonth = isSameMonth(day, currentDate);

                return (
                  <div 
                    key={day.toISOString()} 
                    className={`calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${dayTrips.length > 0 ? 'has-trips' : ''}`}
                  >
                    <div className="day-number">{format(day, 'd')}</div>
                    <div className="day-trips">
                      {dayTrips.map((trip, tripIndex) => {
                        const isStart = isSameDay(day, trip.startDate);
                        
                        return (
                          <div 
                            key={trip.id + '-' + tripIndex}
                            className="trip-event"
                            style={{ backgroundColor: trip.color }}
                            title={trip.name}
                          >
                            {(isStart || (trip.startDate <= day && trip.endDate >= day)) && (
                              <span className="trip-name">
                                {isStart ? trip.name : ''}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;

