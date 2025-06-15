import React, { useState, useEffect } from 'react';
import { Star, ShoppingBag, Heart, Eye, Check, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, getItemQuantity, updateQuantity, removeFromCart, showAddedNotification, lastAddedItem } = useCart();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showQuantityControls, setShowQuantityControls] = useState(false);

  const currentQuantity = getItemQuantity(product.id);
  const isInCart = currentQuantity > 0;

  // Check if this product was just added to cart
  useEffect(() => {
    if (showAddedNotification && lastAddedItem === product.id) {
      setIsAddedToCart(true);
      const timer = setTimeout(() => {
        setIsAddedToCart(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showAddedNotification, lastAddedItem, product.id]);

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    
    try {
      await addToCart(product);
      setShowQuantityControls(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = (newQuantity, e) => {
    e.stopPropagation();
    if (newQuantity <= 0) {
      removeFromCart(product.id);
      setShowQuantityControls(false);
    } else {
      updateQuantity(product.id, newQuantity);
    }
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    console.log('Wishlist toggled for:', product.title);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  // Calculate discount percentage
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div 
        className="card product-card h-100 border-0 shadow-sm position-relative overflow-hidden"
        style={{ 
          borderRadius: '16px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          transform: 'translateY(0)'
        }}
        onClick={handleCardClick}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        }}
      >
        {/* Product Image Container */}
        <div className="position-relative overflow-hidden" style={{ height: '220px' }}>
          <img 
            src={product.image}
            alt={product.title}
            className="card-img-top w-100 h-100"
            style={{ 
              objectFit: 'cover',
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
            }}
          />
          
          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <div className="position-absolute top-0 start-0 m-3">
              <span className="badge bg-danger rounded-pill px-3 py-2 fw-bold">
                -{discountPercentage}%
              </span>
            </div>
          )}

          {/* Category Badge */}
          <div className="position-absolute top-0 end-0 m-3">
            <span className="badge bg-dark bg-opacity-75 rounded-pill px-3 py-2">
              {product.category?.charAt(0).toUpperCase() + product.category?.slice(1)}
            </span>
          </div>
          
          {/* Hover Action Buttons */}
          <div className="position-absolute top-50 end-0 translate-middle-y me-3 d-flex flex-column gap-2 opacity-0 action-buttons"
               style={{ transition: 'opacity 0.3s ease' }}>
            <button 
              className={`btn btn-light btn-sm rounded-circle p-2 shadow-sm ${isWishlisted ? 'text-danger' : ''}`}
              onClick={handleWishlist}
              title="Add to Wishlist"
              style={{ width: '40px', height: '40px' }}
            >
              <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
            <button 
              className="btn btn-light btn-sm rounded-circle p-2 shadow-sm"
              onClick={handleQuickView}
              title="Quick View"
              style={{ width: '40px', height: '40px' }}
            >
              <Eye size={16} />
            </button>
          </div>

          {/* Added to Cart Success Overlay */}
          {isAddedToCart && (
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-success bg-opacity-90 text-white">
              <div className="text-center">
                <Check size={32} className="mb-2" />
                <div className="fw-bold">Added to Cart!</div>
              </div>
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="card-body d-flex flex-column p-3">
          {/* Product Title */}
          <h6 className="card-title fw-semibold text-dark mb-2 flex-grow-1" 
              style={{ 
                fontSize: '14px',
                lineHeight: '1.4',
                minHeight: '40px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}>
            {product.title}
          </h6>
          
          {/* Rating and Reviews */}
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center">
              <div className="d-flex align-items-center me-2">
                {[...Array(5)].map((_, index) => (
                  <Star 
                    key={index}
                    size={12} 
                    className={`me-1 ${index < Math.floor(product.rating?.rate || product.rating || 0) ? 'text-warning' : 'text-muted'}`}
                    fill={index < Math.floor(product.rating?.rate || product.rating || 0) ? 'currentColor' : 'none'}
                  />
                ))}
                <span className="small fw-medium text-dark ms-1" style={{ fontSize: '12px' }}>
                  {(product.rating?.rate || product.rating || 0).toFixed(1)}
                </span>
              </div>
            </div>
            <span className="small text-muted" style={{ fontSize: '11px' }}>
              ({product.rating?.count || product.reviews || 0} reviews)
            </span>
          </div>
          
          {/* Price Section */}
          <div className="mb-3">
            <div className="d-flex align-items-baseline gap-2">
              <span className="h5 text-primary fw-bold mb-0">${product.price?.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="small text-muted text-decoration-line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {discountPercentage > 0 && (
              <div className="small text-success fw-semibold">
                You save ${(product.originalPrice - product.price).toFixed(2)}
              </div>
            )}
          </div>
          
          {/* Add to Cart / Quantity Controls */}
          <div className="mt-auto">
            {!isInCart && !showQuantityControls ? (
              <button
                className="btn btn-primary w-100 rounded-pill d-flex align-items-center justify-content-center gap-2 fw-semibold"
                onClick={handleAddToCart}
                disabled={isLoading}
                style={{ padding: '10px 16px' }}
              >
                {isLoading ? (
                  <>
                    <div className="spinner-border spinner-border-sm" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            ) : (
              <div className="d-flex align-items-center justify-content-between p-2 bg-light rounded-pill">
                <button 
                  className="btn btn-outline-primary btn-sm rounded-circle d-flex align-items-center justify-content-center"
                  onClick={(e) => handleQuantityChange(currentQuantity - 1, e)}
                  style={{ width: '32px', height: '32px' }}
                >
                  <Minus size={14} />
                </button>
                
                <div className="d-flex flex-column align-items-center mx-3">
                  <span className="fw-bold text-primary" style={{ fontSize: '16px' }}>
                    {currentQuantity}
                  </span>
                  <span className="small text-muted" style={{ fontSize: '10px' }}>
                    in cart
                  </span>
                </div>
                
                <button 
                  className="btn btn-outline-primary btn-sm rounded-circle d-flex align-items-center justify-content-center"
                  onClick={(e) => handleQuantityChange(currentQuantity + 1, e)}
                  style={{ width: '32px', height: '32px' }}
                >
                  <Plus size={14} />
                </button>
              </div>
            )}
            
            {/* Quick Actions */}
            <div className="d-flex gap-2 mt-2">
              <button
                className="btn btn-outline-secondary btn-sm rounded-pill flex-grow-1 d-flex align-items-center justify-content-center gap-1"
                onClick={handleQuickView}
                style={{ fontSize: '12px', padding: '6px 12px' }}
              >
                <Eye size={12} />
                <span>Quick View</span>
              </button>
              <button
                className={`btn btn-sm rounded-pill d-flex align-items-center justify-content-center ${
                  isWishlisted ? 'btn-danger' : 'btn-outline-secondary'
                }`}
                onClick={handleWishlist}
                style={{ width: '36px', height: '28px' }}
              >
                <Heart size={12} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </div>

        {/* Cart Status Indicator */}
        {isInCart && (
          <div className="position-absolute top-0 start-0 w-100">
            <div className="bg-success text-white text-center py-1" style={{ fontSize: '11px' }}>
              ✓ In Cart ({currentQuantity})
            </div>
          </div>
        )}
      </div>

      {/* CSS for hover effects */}
      <style jsx>{`
        .product-card:hover .action-buttons {
          opacity: 1 !important;
        }
        
        .product-card {
          transition: all 0.3s ease;
        }
        
        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.15);
        }
        
        @media (max-width: 768px) {
          .action-buttons {
            opacity: 1 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductCard;