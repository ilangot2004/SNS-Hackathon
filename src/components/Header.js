import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logoutUser } from '../utils/auth';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/dashboard" className="logo">
          <img src="/GT-01.png" alt="GlobalTrotter" className="logo-image" />
          <span className="logo-text">GlobalTrotter</span>
        </Link>
        <div className="header-actions">
          {currentUser && (
            <>
              <span className="user-email">{userData?.email || currentUser.email}</span>
              <button 
                className="logout-button"
                onClick={handleLogout}
                aria-label="Logout"
              >
                Logout
              </button>
            </>
          )}
          <button 
            className="profile-icon" 
            onClick={() => navigate('/profile')}
            aria-label="Profile"
          >
            <div className="profile-circle">
              {userData?.photoURL || currentUser?.photoURL ? (
                <img 
                  src={userData?.photoURL || currentUser.photoURL} 
                  alt="Profile" 
                  className="profile-image-icon"
                />
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26003 15 3.41003 18.13 3.41003 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
