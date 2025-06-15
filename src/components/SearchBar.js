import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Bell, Heart, Menu, Minus, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const SearchBar = ({ 
  searchTerm, 
  onSearchChange, 
  wishlistCount = 0,
  onSignInClick,
  onWishlistClick,
  onNotificationClick,
  onMenuClick,
  isLoggedIn = false,
  userName = ''
}) => {
  const navigate = useNavigate();
  const { cartItems = [], getTotalItems, getTotalPrice, updateQuantity, removeFromCart } = useCart() || {};
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const [cartAnimation, setCartAnimation] = useState(false);

  // Calculate total cart items with safety check
  const cartItemCount = getTotalItems ? getTotalItems() : 0;
  const cartTotal = getTotalPrice ? getTotalPrice() : 0;

  // Animate cart icon when items are added
  useEffect(() => {
    if (cartItemCount > 0) {
      setCartAnimation(true);
      const timer = setTimeout(() => setCartAnimation(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartItemCount]);

  const handleCartClick = () => {
    setShowCartPreview(false);
    navigate('/cart');
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (onNotificationClick) onNotificationClick();
  };

  const handleCartHover = () => {
    if (cartItemCount > 0) {
      setShowCartPreview(true);
    }
  };

  const handleCartLeave = () => {
    setTimeout(() => setShowCartPreview(false), 200);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.cart-preview-container') && 
          !event.target.closest('.cart-button')) {
        setShowCartPreview(false);
      }
      if (!event.target.closest('.notification-container') && 
          !event.target.closest('.notification-button')) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="sticky-top bg-white shadow-sm border-bottom">
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-between py-3">
          {/* Mobile Menu Button */}
          <button 
            className="btn btn-outline-secondary d-lg-none me-2 rounded-pill"
            onClick={onMenuClick}
            aria-label="Menu"
          >
            <Menu size={20} />
          </button>

          {/* Logo/Brand */}
          <div className="d-none d-lg-block me-4">
            <h3 className="mb-0 text-primary fw-bold" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
              🛒 
            </h3>
          </div>

          {/* Mobile Logo */}
          <div className="d-lg-none">
            <h5 className="mb-0 text-primary fw-bold" onClick={() => navigate('/')}>
              🛒 
            </h5>
          </div>

          {/* Search Bar */}
          <div className="position-relative flex-grow-1 mx-3" style={{ maxWidth: '600px' }}>
            <div className="position-absolute top-50 start-0 translate-middle-y ms-3" style={{ zIndex: 10 }}>
              <Search size={20} className="text-muted" />
            </div>
            <input
              type="text"
              className="form-control ps-5 pe-4 py-2"
              placeholder="Search for products, brands, and more..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{ 
                borderRadius: '30px',
                border: '2px solid #e3f2fd',
                fontSize: '15px',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#2196f3';
                e.target.style.boxShadow = '0 0 0 3px rgba(33, 150, 243, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e3f2fd';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Action Buttons */}
          <div className="d-flex align-items-center gap-2">
            {/* Notifications */}
            <div className="position-relative notification-container">
              <button 
                className="btn btn-outline-primary rounded-circle p-2 position-relative notification-button"
                onClick={handleNotificationClick}
                aria-label="Notifications"
                style={{ width: '44px', height: '44px' }}
              >
                <Bell size={20} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" 
                      style={{ fontSize: '10px', minWidth: '18px', height: '18px' }}>
                  3
                </span>
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="position-absolute top-100 end-0 mt-2 bg-white border rounded-3 shadow-lg" 
                     style={{ width: '320px', zIndex: 1050 }}>
                  <div className="p-3">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="mb-0 fw-bold">Notifications</h6>
                      <button className="btn btn-sm btn-outline-secondary rounded-pill px-3">
                        Mark all read
                      </button>
                    </div>
                    <div className="notification-list">
                      <div className="d-flex align-items-start mb-3 p-2 rounded bg-light">
                        <div className="bg-success rounded-circle me-3 mt-1" style={{ width: '8px', height: '8px' }}></div>
                        <div className="flex-grow-1">
                          <div className="fw-semibold small">Order Shipped</div>
                          <div className="text-muted small">Your order #12345 has been shipped and is on the way!</div>
                          <div className="text-muted" style={{ fontSize: '11px' }}>2 hours ago</div>
                        </div>
                      </div>
                      <div className="d-flex align-items-start mb-3 p-2 rounded">
                        <div className="bg-primary rounded-circle me-3 mt-1" style={{ width: '8px', height: '8px' }}></div>
                        <div className="flex-grow-1">
                          <div className="fw-semibold small">Flash Sale Alert</div>
                          <div className="text-muted small">Up to 50% off on electronics - Limited time offer!</div>
                          <div className="text-muted" style={{ fontSize: '11px' }}>5 hours ago</div>
                        </div>
                      </div>
                      <div className="d-flex align-items-start p-2 rounded">
                        <div className="bg-info rounded-circle me-3 mt-1" style={{ width: '8px', height: '8px' }}></div>
                        <div className="flex-grow-1">
                          <div className="fw-semibold small">Welcome to JK ShopZone!</div>
                          <div className="text-muted small">Thanks for joining us. Enjoy exclusive member benefits.</div>
                          <div className="text-muted" style={{ fontSize: '11px' }}>1 day ago</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <button className="btn btn-outline-primary btn-sm rounded-pill">
                        View All Notifications
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist */}
            <div className="position-relative d-none d-sm-block">
              <button 
                className="btn btn-outline-primary rounded-circle p-2 position-relative"
                onClick={onWishlistClick}
                aria-label="Wishlist"
                style={{ width: '44px', height: '44px' }}
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" 
                        style={{ fontSize: '10px', minWidth: '18px', height: '18px' }}>
                    {wishlistCount}
                  </span>
                )}
              </button>
            </div>

            {/* Shopping Cart with Enhanced Preview */}
            <div 
              className="position-relative cart-preview-container"
              onMouseEnter={handleCartHover}
              onMouseLeave={handleCartLeave}
            >
              <button 
                className={`btn btn-primary rounded-circle p-2 position-relative cart-button ${cartAnimation ? 'animate-pulse' : ''}`}
                onClick={handleCartClick}
                aria-label="Shopping Cart"
                style={{ 
                  width: '44px', 
                  height: '44px',
                  transform: cartAnimation ? 'scale(1.1)' : 'scale(1)',
                  transition: 'transform 0.3s ease'
                }}
              >
                <ShoppingCart size={20} />
                {cartItemCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger fw-bold" 
                        style={{ fontSize: '10px', minWidth: '20px', height: '20px', lineHeight: '20px' }}>
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Enhanced Cart Preview Dropdown */}
              {showCartPreview && Array.isArray(cartItems) && cartItems.length > 0 && (
                <div className="position-absolute top-100 end-0 mt-2 bg-white border rounded-3 shadow-lg" 
                     style={{ width: '380px', zIndex: 1050 }}>
                  <div className="p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="mb-0 fw-bold">Shopping Cart ({cartItemCount} items)</h6>
                      <button 
                        className="btn-close btn-sm"
                        onClick={() => setShowCartPreview(false)}
                        aria-label="Close"
                      ></button>
                    </div>
                    
                    <div className="cart-preview-items" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                      {cartItems.slice(0, 4).map((item, index) => (
                        <div key={item.id || index} className="d-flex align-items-center mb-3 p-2 border rounded-2">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            className="rounded me-3"
                          />
                          <div className="flex-grow-1">
                            <div className="fw-semibold small mb-1" style={{ fontSize: '13px' }}>
                              {item.title?.substring(0, 30)}...
                            </div>
                            <div className="text-primary fw-bold">${item.price?.toFixed(2)}</div>
                          </div>
                          <div className="d-flex align-items-center">
                            <button 
                              className="btn btn-outline-secondary btn-sm rounded-circle p-1 me-2"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              style={{ width: '28px', height: '28px' }}
                            >
                              <Minus size={12} />
                            </button>
                            <span className="fw-semibold mx-2" style={{ minWidth: '20px', textAlign: 'center' }}>
                              {item.quantity}
                            </span>
                            <button 
                              className="btn btn-outline-secondary btn-sm rounded-circle p-1 me-2"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              style={{ width: '28px', height: '28px' }}
                            >
                              <Plus size={12} />
                            </button>
                            <button 
                              className="btn btn-outline-danger btn-sm rounded-circle p-1"
                              onClick={() => handleRemoveItem(item.id)}
                              style={{ width: '28px', height: '28px' }}
                            >
                              <X size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      {cartItems.length > 4 && (
                        <div className="text-center text-muted small mb-3">
                          +{cartItems.length - 4} more items
                        </div>
                      )}
                    </div>
                    
                    <div className="border-top pt-3 mt-3">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="fw-bold">Subtotal:</span>
                        <span className="fw-bold text-primary h5 mb-0">${cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="d-grid gap-2">
                        <button 
                          className="btn btn-primary rounded-pill fw-semibold"
                          onClick={handleCartClick}
                        >
                          View Cart & Checkout
                        </button>
                        <button 
                          className="btn btn-outline-primary rounded-pill"
                          onClick={() => navigate('/')}
                        >
                          Continue Shopping
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Empty Cart Message */}
              {showCartPreview && (!Array.isArray(cartItems) || cartItems.length === 0) && (
                <div className="position-absolute top-100 end-0 mt-2 bg-white border rounded-3 shadow-lg" 
                     style={{ width: '280px', zIndex: 1050 }}>
                  <div className="p-4 text-center">
                    <ShoppingCart size={48} className="text-muted mb-3" />
                    <h6 className="fw-bold mb-2">Your cart is empty</h6>
                    <p className="text-muted small mb-3">Add some products to get started!</p>
                    <button 
                      className="btn btn-primary rounded-pill"
                      onClick={() => navigate('/')}
                    >
                      Start Shopping
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Account / Sign In */}
            <div className="dropdown">
              <button 
                className="btn btn-outline-primary rounded-circle p-2 dropdown-toggle border-0"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                aria-label="User Account"
                style={{ width: '44px', height: '44px' }}
              >
                <User size={20} />
              </button>
              <ul className="dropdown-menu dropdown-menu-end rounded-3 shadow border-0" style={{ minWidth: '200px' }}>
                {isLoggedIn ? (
                  <>
                    <li><h6 className="dropdown-header text-primary">Hello, {userName}! 👋</h6></li>
                    <li><a className="dropdown-item rounded-2 mx-2" href="#profile">👤 My Profile</a></li>
                    <li><a className="dropdown-item rounded-2 mx-2" href="#orders">📦 My Orders</a></li>
                    <li><a className="dropdown-item rounded-2 mx-2" href="#settings">⚙️ Settings</a></li>
                    <li><hr className="dropdown-divider mx-2" /></li>
                    <li><a className="dropdown-item rounded-2 mx-2 text-danger" href="#logout">🚪 Sign Out</a></li>
                  </>
                ) : (
                  <>
                    <li><a className="dropdown-item rounded-2 mx-2 fw-semibold" href="#signin" onClick={onSignInClick}>🔐 Sign In</a></li>
                    <li><a className="dropdown-item rounded-2 mx-2" href="#signup">✨ Create Account</a></li>
                    <li><hr className="dropdown-divider mx-2" /></li>
                    <li><a className="dropdown-item rounded-2 mx-2" href="#help">❓ Help & Support</a></li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;