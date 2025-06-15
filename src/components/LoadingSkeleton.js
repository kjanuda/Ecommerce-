// src/components/LoadingSkeleton.js
import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 border-0 shadow-sm">
        {/* Image Skeleton */}
        <div className="skeleton rounded-top" style={{ height: '250px' }}></div>
        
        {/* Content Skeleton */}
        <div className="card-body">
          {/* Title Skeleton */}
          <div className="skeleton rounded mb-3" style={{ height: '24px' }}></div>
          
          {/* Rating Skeleton */}
          <div className="skeleton rounded mb-3" style={{ height: '16px', width: '60%' }}></div>
          
          {/* Price and Button Skeleton */}
          <div className="d-flex justify-content-between align-items-center">
            <div className="skeleton rounded" style={{ height: '32px', width: '80px' }}></div>
            <div className="skeleton rounded-pill" style={{ height: '38px', width: '120px' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;