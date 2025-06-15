// src/components/Sidebar.js
import React, { useState } from 'react';
import { Filter } from 'lucide-react';

const Sidebar = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange,
  onPriceRangeChange = () => {},
  priceRange = { min: '', max: '' }
}) => {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);

  const handlePriceChange = (field, value) => {
    const newRange = { ...localPriceRange, [field]: value };
    setLocalPriceRange(newRange);
  };

  const applyPriceFilter = () => {
    if (onPriceRangeChange && typeof onPriceRangeChange === 'function') {
      onPriceRangeChange(localPriceRange);
    }
  };

  const clearPriceFilter = () => {
    const clearedRange = { min: '', max: '' };
    setLocalPriceRange(clearedRange);
    if (onPriceRangeChange && typeof onPriceRangeChange === 'function') {
      onPriceRangeChange(clearedRange);
    }
  };

  return (
    <div className="col-md-3">
      <div className="sidebar bg-white text-dark p-4 rounded shadow">
        {/* Filter Header */}
        <div className="d-flex align-items-center mb-4">
          <Filter className="me-2 text-dark" size={20} />
          <h5 className="mb-0 text-dark">Filters</h5>
        </div>
        
        {/* Categories */}
        <div className="mb-4">
          <h6 className="text-dark mb-3">Categories</h6>
          <div className="d-grid gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`btn d-flex justify-content-between align-items-center p-3 text-start ${
                  selectedCategory === category.id
                    ? 'btn-primary text-white'
                    : 'btn-outline-dark text-dark'
                }`}
              >
                <span>{category.name}</span>
                <span className={`badge ${
                  selectedCategory === category.id ? 'bg-light text-primary' : 'bg-dark text-white'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="mb-4">
          <h6 className="text-dark mb-3">Price Range</h6>
          <div className="row g-2 mb-3">
            <div className="col-6">
              <input
                type="number"
                className="form-control"
                placeholder="Min Price"
                value={localPriceRange.min}
                onChange={(e) => handlePriceChange('min', e.target.value)}
                min="0"
              />
            </div>
            <div className="col-6">
              <input
                type="number"
                className="form-control"
                placeholder="Max Price"
                value={localPriceRange.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                min="0"
              />
            </div>
          </div>
          <div className="d-grid gap-2">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={applyPriceFilter}
            >
              Apply Price Filter
            </button>
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={clearPriceFilter}
            >
              Clear Price Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;