import React from 'react';

const EcommerceFooter = () => {
  return (
    <>
      {/* Bootstrap CSS CDN */}
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" 
        rel="stylesheet"
      />
      
      <footer className="bg-light border-top py-5">
      <div className="container">
        {/* Main Footer Content */}
        <div className="row">
          {/* Buy Section */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold text-dark mb-3">Buy</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/registration" className="text-muted text-decoration-none">Registration</a>
              </li>
              <li className="mb-2">
                <a href="/bidding-help" className="text-muted text-decoration-none">Bidding & buying help</a>
              </li>
              <li className="mb-2">
                <a href="/stores" className="text-muted text-decoration-none">Stores</a>
              </li>
              <li className="mb-2">
                <a href="/creator-collections" className="text-muted text-decoration-none">Creator Collections</a>
              </li>
              <li className="mb-2">
                <a href="/charity-shop" className="text-muted text-decoration-none">Shop for Charity</a>
              </li>
              <li className="mb-2">
                <a href="/charity" className="text-muted text-decoration-none">Charity Shop</a>
              </li>
              <li className="mb-2">
                <a href="/seasonal-sales" className="text-muted text-decoration-none">Seasonal Sales and events</a>
              </li>
              <li className="mb-2">
                <a href="/gift-cards" className="text-muted text-decoration-none">Gift Cards</a>
              </li>
            </ul>
          </div>

          {/* Sell Section */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold text-dark mb-3">Sell</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/start-selling" className="text-muted text-decoration-none">Start selling</a>
              </li>
              <li className="mb-2">
                <a href="/how-to-sell" className="text-muted text-decoration-none">How to sell</a>
              </li>
              <li className="mb-2">
                <a href="/business-sellers" className="text-muted text-decoration-none">Business sellers</a>
              </li>
              <li className="mb-2">
                <a href="/affiliates" className="text-muted text-decoration-none">Affiliates</a>
              </li>
            </ul>

            <h6 className="fw-bold text-dark mb-3 mt-4">Tools & apps</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/developers" className="text-muted text-decoration-none">Developers</a>
              </li>
              <li className="mb-2">
                <a href="/security-center" className="text-muted text-decoration-none">Security center</a>
              </li>
              <li className="mb-2">
                <a href="/sitemap" className="text-muted text-decoration-none">Site map</a>
              </li>
            </ul>
          </div>

          {/* Companies Section */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold text-dark mb-3">Our companies</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="https://www.tcgplayer.com" className="text-muted text-decoration-none">TCGplayer</a>
              </li>
            </ul>

            <h6 className="fw-bold text-dark mb-3 mt-4">Stay connected</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="https://facebook.com/yourstore" className="text-muted text-decoration-none d-flex align-items-center">
                  <svg width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                  </svg>
                  Facebook
                </a>
              </li>
              <li className="mb-2">
                <a href="https://twitter.com/yourstore" className="text-muted text-decoration-none d-flex align-items-center">
                  <svg width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                  X (Twitter)
                </a>
              </li>
            </ul>
          </div>

          {/* About Section */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="fw-bold text-dark mb-3">About Our Store</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/company-info" className="text-muted text-decoration-none">Company info</a>
              </li>
              <li className="mb-2">
                <a href="/news" className="text-muted text-decoration-none">News</a>
              </li>
              <li className="mb-2">
                <a href="/legal/dpa" className="text-muted text-decoration-none">Deferred Prosecution Agreement</a>
              </li>
              <li className="mb-2">
                <a href="/investors" className="text-muted text-decoration-none">Investors</a>
              </li>
              <li className="mb-2">
                <a href="/careers" className="text-muted text-decoration-none">Careers</a>
              </li>
              <li className="mb-2">
                <a href="/diversity-inclusion" className="text-muted text-decoration-none">Diversity & Inclusion</a>
              </li>
              <li className="mb-2">
                <a href="/global-impact" className="text-muted text-decoration-none">Global Impact</a>
              </li>
              <li className="mb-2">
                <a href="/government-relations" className="text-muted text-decoration-none">Government relations</a>
              </li>
              <li className="mb-2">
                <a href="/advertise" className="text-muted text-decoration-none">Advertise with us</a>
              </li>
              <li className="mb-2">
                <a href="/policies" className="text-muted text-decoration-none">Policies</a>
              </li>
              <li className="mb-2">
                <a href="/vrop" className="text-muted text-decoration-none">Verified Rights Owner Program</a>
              </li>
              <li className="mb-2">
                <a href="/licenses" className="text-muted text-decoration-none">Licenses</a>
              </li>
            </ul>
          </div>

          {/* Help & Contact Section */}
          <div className="col-lg-3 col-md-6 mb-4">
            <h6 className="fw-bold text-dark mb-3">Help & Contact</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/seller-center" className="text-muted text-decoration-none">Seller Center</a>
              </li>
              <li className="mb-2">
                <a href="/contact" className="text-muted text-decoration-none">Contact Us</a>
              </li>
              <li className="mb-2">
                <a href="/returns" className="text-muted text-decoration-none">Returns</a>
              </li>
              <li className="mb-2">
                <a href="/money-back-guarantee" className="text-muted text-decoration-none">Money Back Guarantee</a>
              </li>
            </ul>

            <h6 className="fw-bold text-dark mb-3 mt-4">Community</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/announcements" className="text-muted text-decoration-none">Announcements</a>
              </li>
              <li className="mb-2">
                <a href="/community" className="text-muted text-decoration-none">Community</a>
              </li>
              <li className="mb-2">
                <a href="/podcast" className="text-muted text-decoration-none">Business Podcast</a>
              </li>
            </ul>

            <h6 className="fw-bold text-dark mb-3 mt-4">Our Sites</h6>
            <div className="dropdown">
              <button className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown">
                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='15' viewBox='0 0 20 15'%3E%3Crect width='20' height='15' fill='%23B22234'/%3E%3Cpath d='M0,0 L20,0 L20,1.15 L0,1.15 Z M0,2.31 L20,2.31 L20,3.46 L0,3.46 Z M0,4.62 L20,4.62 L20,5.77 L0,5.77 Z M0,6.92 L20,6.92 L20,8.08 L0,8.08 Z M0,9.23 L20,9.23 L20,10.38 L0,10.38 Z M0,11.54 L20,11.54 L20,12.69 L0,12.69 Z M0,13.85 L20,13.85 L20,15 L0,15 Z' fill='white'/%3E%3Crect width='8' height='8.08' fill='%233C3B6E'/%3E%3C/svg%3E" 
                     alt="US Flag" className="me-2" width="20" height="15" />
                United States
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/us">United States</a></li>
                <li><a className="dropdown-item" href="/uk">United Kingdom</a></li>
                <li><a className="dropdown-item" href="/ca">Canada</a></li>
                <li><a className="dropdown-item" href="/au">Australia</a></li>
                <li><a className="dropdown-item" href="/de">Germany</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <hr className="my-4" />
        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-wrap justify-content-between align-items-center">
              <div className="mb-2 mb-md-0">
                <small className="text-muted">
                  Copyright © 2025 Store Inc. All Rights Reserved.
                  <br />
                  Powered by <a href="https://kjanuda.github.io/JanudaJK.me/" className="text-decoration-none">Januda J Kodithuwakku</a>
                </small>
              </div>
              <div className="d-flex flex-wrap gap-3">
                <a href="/accessibility" className="text-muted text-decoration-none small">Accessibility</a>
                <a href="/user-agreement" className="text-muted text-decoration-none small">User Agreement</a>
                <a href="/privacy" className="text-muted text-decoration-none small">Privacy</a>
                <a href="/consumer-health-data" className="text-muted text-decoration-none small">Consumer Health Data</a>
                <a href="/payments-terms" className="text-muted text-decoration-none small">Payments Terms of Use</a>
                <a href="/cookies" className="text-muted text-decoration-none small">Cookies</a>
                <a href="/privacy-notice" className="text-muted text-decoration-none small">Privacy Notice</a>
                <a href="/privacy-choices" className="text-muted text-decoration-none small">Your Privacy Choices</a>
                <a href="/adchoice" className="text-muted text-decoration-none small">AdChoice</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap JS for dropdown functionality */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
    </footer>
    </>
  );
};

export default EcommerceFooter;