import React from 'react';
import './SearchBar.css';

const SearchBar = ({ placeholder = "Search...", onSearch, showFilters = true }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const query = formData.get('search');
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          name="search"
          className="search-input"
          placeholder={placeholder}
        />
        {showFilters && (
          <div className="filter-buttons">
            <button type="button" className="filter-btn">Group by</button>
            <button type="button" className="filter-btn">Filter</button>
            <button type="button" className="filter-btn">Sort by...</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;

