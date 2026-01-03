import React, { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import './Community.css';

const Community = () => {
  // Sample data - will be replaced with MongoDB data
  const [posts] = useState([
    {
      id: 1,
      author: 'Traveler123',
      title: 'Amazing Paragliding Experience in Interlaken',
      content: 'Just came back from an incredible paragliding adventure in Switzerland. The views were absolutely breathtaking!',
      location: 'Interlaken, Switzerland',
      date: '2 days ago',
      likes: 45
    },
    {
      id: 2,
      author: 'WanderlustJane',
      title: 'Hidden Gems of Tokyo - A Complete Guide',
      content: 'Spent 2 weeks exploring Tokyo and found some incredible hidden spots that aren\'t in the typical tourist guides.',
      location: 'Tokyo, Japan',
      date: '5 days ago',
      likes: 128
    },
    {
      id: 3,
      author: 'CityExplorer',
      title: 'Best Food Tours in Paris',
      content: 'If you love food, you must try these local food tours. The croissants alone are worth the trip!',
      location: 'Paris, France',
      date: '1 week ago',
      likes: 92
    },
    {
      id: 4,
      author: 'AdventureSeeker',
      title: 'Safari Experience in Kenya',
      content: 'Just returned from an unforgettable safari. Saw the Big Five and so much more. Highly recommend!',
      location: 'Nairobi, Kenya',
      date: '2 weeks ago',
      likes: 156
    }
  ]);

  const handleSearch = (query) => {
    console.log('Search query:', query);
    // TODO: Implement search functionality
  };

  return (
    <div className="community">
      <Header />
      <div className="community-content">
        <div className="community-container">
          <h1 className="page-title">Community</h1>
          <p className="page-description">
            Community section where all the users can share their experience about a certain trip or activity. 
            Using the search, groupby or filter and sortby option, the user can narrow down the result that he is looking for...
          </p>

          <SearchBar 
            placeholder="Search experiences, destinations, activities..." 
            onSearch={handleSearch}
          />

          <div className="posts-list">
            {posts.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-header">
                  <div className="author-avatar">
                    <span>{post.author.charAt(0)}</span>
                  </div>
                  <div className="post-meta">
                    <h3 className="post-author">{post.author}</h3>
                    <div className="post-info">
                      <span className="post-location">{post.location}</span>
                      <span className="post-date">{post.date}</span>
                    </div>
                  </div>
                </div>
                <div className="post-content">
                  <h2 className="post-title">{post.title}</h2>
                  <p className="post-text">{post.content}</p>
                </div>
                <div className="post-footer">
                  <button className="like-button">
                    <span>❤️</span>
                    <span>{post.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;

