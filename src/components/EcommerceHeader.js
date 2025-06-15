import React, { useState, useEffect, useRef } from 'react';

const EcommerceHeader = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const intervalRef = useRef(null);

  const slides = [
    {
      id: 1,
      title: "Get help exactly when you need it",
      subtitle: "From shipping to returns, find answers to all of your questions with our 24/7 support team.",
      buttonText: "Start here",
      secondaryButton: "Learn More",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bgColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      category: "Support",
      stats: { value: "24/7", label: "Support" },
      features: ["Live Chat", "Phone Support", "Email Help", "FAQ"]
    },
    {
      id: 2,
      title: "Premium Quality Products",
      subtitle: "Discover our curated collection of top-rated items with guaranteed quality and fast delivery.",
      buttonText: "Shop Now",
      secondaryButton: "View Catalog",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bgColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      category: "Products",
      stats: { value: "5000+", label: "Products" },
      features: ["Premium Quality", "Fast Delivery", "Easy Returns", "Warranty"]
    },
    {
      id: 3,
      title: "Exclusive Member Benefits",
      subtitle: "Join our loyalty program and enjoy special discounts, early access, and exclusive member-only deals.",
      buttonText: "Join Now",
      secondaryButton: "View Benefits",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bgColor: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
      category: "Membership",
      stats: { value: "50%", label: "Savings" },
      features: ["Exclusive Deals", "Early Access", "Free Shipping", "Points Rewards"]
    },
    {
      id: 4,
      title: "Secure & Fast Checkout",
      subtitle: "Experience lightning-fast checkout with multiple payment options and bank-level security.",
      buttonText: "Shop Secure",
      secondaryButton: "Security Info",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bgColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      category: "Security",
      stats: { value: "SSL", label: "Encrypted" },
      features: ["Secure Payment", "Multiple Options", "One-Click Buy", "Data Protection"]
    },
    {
      id: 5,
      title: "Global Shipping & Returns",
      subtitle: "We ship worldwide with free returns. Track your order in real-time from our warehouse to your door.",
      buttonText: "Track Order",
      secondaryButton: "Shipping Info",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      bgColor: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
      category: "Shipping",
      stats: { value: "195", label: "Countries" },
      features: ["Global Shipping", "Real-time Tracking", "Free Returns", "Express Delivery"]
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && !isHovered) {
      intervalRef.current = setInterval(() => {
        setAnimationClass('slide-out');
        setTimeout(() => {
          setCurrentSlide((prev) => (prev + 1) % slides.length);
          setAnimationClass('slide-in');
          setProgress(0);
        }, 300);
      }, 5000);
      
      // Progress bar animation
      const progressInterval = setInterval(() => {
        setProgress(prev => prev >= 100 ? 0 : prev + 2);
      }, 100);

      return () => {
        clearInterval(intervalRef.current);
        clearInterval(progressInterval);
      };
    }
  }, [isPlaying, isHovered, slides.length]);

  // Touch/swipe functionality
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  // Navigation functions
  const nextSlide = () => {
    setAnimationClass('slide-out');
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setAnimationClass('slide-in');
      setProgress(0);
    }, 300);
  };

  const prevSlide = () => {
    setAnimationClass('slide-out');
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setAnimationClass('slide-in');
      setProgress(0);
    }, 300);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    setProgress(0);
  };

  const goToSlide = (index) => {
    if (index !== currentSlide) {
      setAnimationClass('slide-out');
      setTimeout(() => {
        setCurrentSlide(index);
        setAnimationClass('slide-in');
        setProgress(0);
      }, 300);
    }
  };

  const currentSlideData = slides[currentSlide];

  return (
    <>
      {/* Bootstrap CSS */}
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" 
        rel="stylesheet" 
      />
      
      <div 
        className="position-relative overflow-hidden user-select-none"
        style={{ height: '100vh', minHeight: '600px' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Background Overlay */}
        <div 
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            background: currentSlideData.bgColor,
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        />

        {/* Animated Background Elements */}
        <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="position-absolute rounded-circle"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                background: 'rgba(255,255,255,0.1)',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Main Content Container */}
        <div className="container-fluid h-100 position-relative">
          <div className="row h-100 align-items-center">
            
            {/* Content Section */}
            <div className="col-lg-6 col-md-7 ps-4 ps-md-5">
              <div className="text-white position-relative">
                
                {/* Category Badge */}
                <div className="mb-3">
                  <span 
                    className="badge rounded-pill px-3 py-2 fw-normal"
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      fontSize: '0.9rem'
                    }}
                  >
                    <i className="bi bi-star-fill me-2"></i>
                    {currentSlideData.category}
                  </span>
                </div>

                {/* Main Title */}
                <h1 
                  className={`display-3 fw-bold mb-4 ${animationClass}`}
                  style={{ 
                    lineHeight: '1.2',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  {currentSlideData.title}
                </h1>

                {/* Subtitle */}
                <p 
                  className={`lead mb-4 fs-4 ${animationClass}`}
                  style={{ 
                    opacity: 0.95,
                    lineHeight: '1.6',
                    maxWidth: '90%'
                  }}
                >
                  {currentSlideData.subtitle}
                </p>

                {/* Features List */}
                <div className="mb-4">
                  <div className="row g-2">
                    {currentSlideData.features.map((feature, index) => (
                      <div key={index} className="col-6">
                        <div 
                          className="d-flex align-items-center"
                          style={{ fontSize: '0.9rem', opacity: 0.9 }}
                        >
                          <i className="bi bi-check-circle-fill me-2 text-success"></i>
                          {feature}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats Display */}
                <div className="mb-4">
                  <div 
                    className="d-inline-block px-4 py-2 rounded-3"
                    style={{
                      background: 'rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(15px)',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}
                  >
                    <div className="text-center">
                      <div className="h2 mb-0 fw-bold">{currentSlideData.stats.value}</div>
                      <small className="opacity-75">{currentSlideData.stats.label}</small>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex flex-wrap gap-3">
                  <button 
                    className="btn btn-light btn-lg px-4 py-3 rounded-pill fw-semibold shadow-lg position-relative overflow-hidden"
                    style={{
                      background: 'rgba(255,255,255,0.95)',
                      backdropFilter: 'blur(10px)',
                      border: 'none',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      minWidth: '160px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-3px) scale(1.02)';
                      e.target.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0) scale(1)';
                      e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                    }}
                  >
                    <span className="position-relative">
                      {currentSlideData.buttonText}
                      <i className="bi bi-arrow-right ms-2"></i>
                    </span>
                  </button>

                  <button 
                    className="btn btn-outline-light btn-lg px-4 py-3 rounded-pill fw-semibold"
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      transition: 'all 0.3s ease',
                      minWidth: '140px'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(255,255,255,0.2)';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(255,255,255,0.1)';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    {currentSlideData.secondaryButton}
                  </button>
                </div>
              </div>
            </div>
            
            {/* Image Section */}
            <div className="col-lg-6 col-md-5 d-flex justify-content-center align-items-center">
              <div className="position-relative">
                <div 
                  className="position-relative overflow-hidden rounded-4 shadow-lg"
                  style={{
                    maxHeight: '70vh',
                    transform: 'perspective(1000px) rotateY(-5deg)',
                    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'perspective(1000px) rotateY(0deg) scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'perspective(1000px) rotateY(-5deg) scale(1)';
                  }}
                >
                  <img
                    src={currentSlideData.image}
                    alt={currentSlideData.title}
                    className="img-fluid"
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover',
                      filter: 'brightness(1.1) contrast(1.1)',
                      transition: 'all 0.3s ease'
                    }}
                  />
                  
                  {/* Image Overlay */}
                  <div 
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                      background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)',
                      backdropFilter: 'blur(0.5px)'
                    }}
                  />
                </div>

                {/* Floating Elements */}
                <div 
                  className="position-absolute top-0 end-0 translate-middle-x"
                  style={{ marginTop: '-20px', marginRight: '-20px' }}
                >
                  <div 
                    className="bg-white rounded-circle p-3 shadow-lg"
                    style={{
                      animation: 'bounce 2s infinite',
                      background: 'rgba(255,255,255,0.95)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <i className="bi bi-heart-fill text-danger fs-4"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Navigation Controls */}
        <div className="position-absolute top-50 start-0 translate-middle-y ms-4">
          <button
            className="btn btn-light rounded-circle shadow-lg position-relative overflow-hidden"
            onClick={prevSlide}
            style={{
              width: '60px',
              height: '60px',
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(255,255,255,0.3)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1)';
              e.target.style.background = 'rgba(255,255,255,1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.background = 'rgba(255,255,255,0.9)';
            }}
          >
            <i className="bi bi-chevron-left fs-4"></i>
          </button>
        </div>

        <div className="position-absolute top-50 end-0 translate-middle-y me-4">
          <button
            className="btn btn-light rounded-circle shadow-lg position-relative overflow-hidden"
            onClick={nextSlide}
            style={{
              width: '60px',
              height: '60px',
              background: 'rgba(255,255,255,0.9)',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(255,255,255,0.3)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.1)';
              e.target.style.background = 'rgba(255,255,255,1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.background = 'rgba(255,255,255,0.9)';
            }}
          >
            <i className="bi bi-chevron-right fs-4"></i>
          </button>
        </div>

        {/* Enhanced Bottom Controls */}
        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4">
          <div 
            className="d-flex align-items-center gap-4 px-4 py-3 rounded-pill" 
            style={{
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.2)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
            }}
          >
            
            {/* Slide Counter */}
            <div className="text-white fw-semibold" style={{ fontSize: '0.9rem' }}>
              {String(currentSlide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </div>

            {/* Slide Indicators */}
            <div className="d-flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`border-0 rounded-pill position-relative overflow-hidden ${
                    index === currentSlide ? 'bg-white' : 'bg-white'
                  }`}
                  style={{
                    width: index === currentSlide ? '40px' : '12px',
                    height: '4px',
                    opacity: index === currentSlide ? 1 : 0.4,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer'
                  }}
                  onClick={() => goToSlide(index)}
                  onMouseEnter={(e) => {
                    if (index !== currentSlide) {
                      e.target.style.opacity = '0.7';
                      e.target.style.transform = 'scaleY(1.5)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (index !== currentSlide) {
                      e.target.style.opacity = '0.4';
                      e.target.style.transform = 'scaleY(1)';
                    }
                  }}
                >
                  {index === currentSlide && (
                    <div 
                      className="position-absolute top-0 start-0 h-100 bg-white rounded-pill"
                      style={{
                        width: `${progress}%`,
                        transition: 'width 0.1s linear',
                        opacity: 0.8
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Play/Pause Control */}
            <button
              className="btn btn-sm btn-light rounded-circle d-flex align-items-center justify-content-center position-relative"
              onClick={togglePlayPause}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              style={{
                width: '40px',
                height: '40px',
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
                transition: 'all 0.3s ease'
              }}
            >
              <i className={`bi ${isPlaying ? 'bi-pause-fill' : 'bi-play-fill'} fs-6`}></i>
              
              {/* Tooltip */}
              {showTooltip && (
                <div 
                  className="position-absolute bottom-100 start-50 translate-middle-x mb-2 px-2 py-1 bg-dark text-white rounded"
                  style={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}
                >
                  {isPlaying ? 'Pause' : 'Play'}
                </div>
              )}
            </button>

            {/* Fullscreen Toggle */}
            <button
              className="btn btn-sm btn-light rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: '40px',
                height: '40px',
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
                transition: 'all 0.3s ease'
              }}
              onClick={() => {
                if (document.fullscreenElement) {
                  document.exitFullscreen();
                } else {
                  document.documentElement.requestFullscreen();
                }
              }}
            >
              <i className="bi bi-arrows-fullscreen fs-6"></i>
            </button>
          </div>
        </div>

        {/* Enhanced Progress Bar */}
        <div 
          className="position-absolute bottom-0 start-0 w-100" 
          style={{ height: '4px', background: 'rgba(255,255,255,0.2)' }}
        >
          <div 
            className="h-100 position-relative overflow-hidden"
            style={{
              width: `${((currentSlide + 1) / slides.length) * 100}%`,
              background: 'linear-gradient(90deg, #fff 0%, rgba(255,255,255,0.8) 100%)',
              transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 0 10px rgba(255,255,255,0.5)'
            }}
          >
            <div 
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                animation: 'shimmer 2s infinite'
              }}
            />
          </div>
        </div>

        {/* Keyboard Navigation Hint */}
        <div 
          className="position-absolute top-0 end-0 m-4 text-white"
          style={{ 
            fontSize: '0.8rem', 
            opacity: 0.6,
            background: 'rgba(0,0,0,0.3)',
            padding: '8px 12px',
            borderRadius: '20px',
            backdropFilter: 'blur(10px)'
          }}
        >
          <i className="bi bi-keyboard me-2"></i>
          Use ← → keys to navigate
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .slide-in {
          animation: slideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .slide-out {
          animation: slideOut 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideOut {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(-30px);
          }
        }
        
        .btn:hover {
          transform: translateY(-2px) !important;
        }
        
        .user-select-none {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }
        
        /* Smooth scrolling for better UX */
        * {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.1);
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.3);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255,255,255,0.5);
        }
        
        /* Focus styles for accessibility */
        .btn:focus {
          outline: 2px solid rgba(255,255,255,0.5);
          outline-offset: 2px;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .display-3 {
            font-size: 2.5rem !important;
          }
          
          .lead {
            font-size: 1.1rem !important;
          }
        }
      `}</style>
    </>
  );
};

// Keyboard navigation support
if (typeof window !== 'undefined') {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      // Previous slide logic would go here
    } else if (e.key === 'ArrowRight') {
      // Next slide logic would go here
    } else if (e.key === ' ') {
      e.preventDefault();
      // Play/pause logic would go here
    }
  });
}

export default EcommerceHeader;