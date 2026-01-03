import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import './BuildItinerary.css';

const BuildItinerary = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [sections, setSections] = useState([
    {
      id: 1,
      title: 'Section 1',
      description: 'All the necessary information about this section. This can be anything like travel section, hotel or any other activity',
      startDate: '',
      endDate: '',
      budget: ''
    }
  ]);

  const handleSectionChange = (id, field, value) => {
    setSections(sections.map(section =>
      section.id === id ? { ...section, [field]: value } : section
    ));
  };

  const addSection = () => {
    const newSection = {
      id: sections.length + 1,
      title: `Section ${sections.length + 1}`,
      description: 'All the necessary information about this section. This can be anything like travel section, hotel or any other activity',
      startDate: '',
      endDate: '',
      budget: ''
    };
    setSections([...sections, newSection]);
  };

  const handleSave = () => {
    // TODO: Save itinerary to MongoDB
    console.log('Itinerary sections:', sections);
    navigate(`/trips/${tripId}`);
  };

  return (
    <div className="build-itinerary">
      <Header />
      <div className="build-itinerary-content">
        <div className="build-itinerary-container">
          <h1 className="page-title">Build Itinerary</h1>

          <div className="sections-list">
            {sections.map((section) => (
              <div key={section.id} className="section-card">
                <h2 className="section-title">{section.title}</h2>
                
                <p className="section-description-text">
                  All the necessary information about this section. This can be anything like trave section, hotel or any other activity
                </p>
                
                <div className="section-description">
                  <textarea
                    value={section.description}
                    onChange={(e) => handleSectionChange(section.id, 'description', e.target.value)}
                    rows="3"
                    className="description-input"
                    placeholder="All the necessary information about this section..."
                  />
                </div>

                <div className="section-dates">
                  <label>Date Range: xxx to yyy</label>
                  <div className="date-inputs">
                    <input
                      type="date"
                      value={section.startDate}
                      onChange={(e) => handleSectionChange(section.id, 'startDate', e.target.value)}
                      className="date-input"
                    />
                    <span>to</span>
                    <input
                      type="date"
                      value={section.endDate}
                      onChange={(e) => handleSectionChange(section.id, 'endDate', e.target.value)}
                      className="date-input"
                    />
                  </div>
                </div>

                <div className="section-budget">
                  <label>Budget of this section</label>
                  <input
                    type="number"
                    value={section.budget}
                    onChange={(e) => handleSectionChange(section.id, 'budget', e.target.value)}
                    placeholder="Enter budget"
                    className="budget-input"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="actions">
            <button onClick={addSection} className="add-section-button">
              + Add another Section
            </button>
            <button onClick={handleSave} className="save-button">
              Save Itinerary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuildItinerary;

