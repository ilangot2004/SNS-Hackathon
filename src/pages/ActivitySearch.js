import React, { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import './ActivitySearch.css';

const ActivitySearch = () => {
  // Sample results - will be replaced with MongoDB data
  const [results] = useState([
    {
      id: 1,
      title: 'Paragliding Experience in Mountain View',
      location: 'Switzerland',
      type: 'Activity',
      description: 'Experience the thrill of paragliding with stunning mountain views',
      price: '$150'
    },
    {
      id: 2,
      title: 'Paragliding Adventure - Interlaken',
      location: 'Switzerland',
      type: 'Activity',
      description: 'Professional paragliding tour with certified instructors',
      price: '$180'
    },
    {
      id: 3,
      title: 'Tandem Paragliding Flight',
      location: 'Austria',
      type: 'Activity',
      description: 'Safe and exciting tandem paragliding experience',
      price: '$120'
    },
    {
      id: 4,
      title: 'Paragliding School',
      location: 'France',
      type: 'Activity',
      description: 'Learn paragliding from expert instructors',
      price: '$300'
    },
    {
      id: 5,
      title: 'Scenic Paragliding Tour',
      location: 'Italy',
      type: 'Activity',
      description: 'Enjoy breathtaking views while paragliding',
      price: '$140'
    },
    {
      id: 6,
      title: 'Paragliding & Photography Package',
      location: 'Switzerland',
      type: 'Activity',
      description: 'Paragliding with professional photography included',
      price: '$200'
    }
  ]);

  const handleSearch = (query) => {
    // TODO: Implement search functionality with MongoDB
    console.log('Search query:', query);
  };

  return (
    <div className="activity-search">
      <Header />
      <div className="activity-search-content">
        <div className="activity-search-container">
          <h1 className="page-title">Search Activities & Cities</h1>

          <SearchBar 
            placeholder="Search for activities or cities..." 
            onSearch={handleSearch}
          />

          <section className="results-section">
            <h2 className="section-title">Results</h2>
            <div className="results-list">
              {results.map((result) => (
                <div key={result.id} className="result-card">
                  <div className="result-header">
                    <h3 className="result-title">{result.title}</h3>
                    <span className="result-price">{result.price}</span>
                  </div>
                  <div className="result-meta">
                    <span className="result-type">{result.type}</span>
                    <span className="result-location">{result.location}</span>
                  </div>
                  <p className="result-description">{result.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ActivitySearch;

