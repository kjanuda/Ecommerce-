// src/components/Header.js
import React from 'react';
import SearchBar from './SearchBar';

const Header = ({ searchTerm, onSearchChange }) => {
  return (
    <header className="header-blur border-bottom sticky-top">
      <div className="container-fluid py-3">
        <div className="row align-items-center">
          {/* Logo and Title */}
          <div className="col-md-6">
            <h1 className="h2 mb-0 text-dark fw-bold">ProductHub</h1>
            <p className="text-muted mb-0 small">Discover amazing products</p>
          </div>
          
          {/* Search Bar */}
          <div className="col-md-6">
            <div className="d-flex justify-content-end">
              <SearchBar 
                searchTerm={searchTerm}
                onSearchChange={onSearchChange}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;