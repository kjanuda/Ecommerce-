// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProductCard from './components/ProductCard';
import LoadingSkeleton from './components/LoadingSkeleton';
import EcommerceHeader from './components/EcommerceHeader';
import EcommerceFooter from './components/EcommerceFooter';
import CartPage from './pages/CartPage';
import { dummyProducts, categories } from './data/products';

// Main Products Page Component
const ProductsPage = () => {
  // State Management
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // Simulate API loading
  useEffect(() => {
    setTimeout(() => {
      setProducts(dummyProducts);
      setFilteredProducts(dummyProducts);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter products based on category and search
  useEffect(() => {
    let filtered = products;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm, products]);

  // Event Handlers
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Header Component */}
      <Header 
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />

      {/* Ecommerce Header Advertisement Section */}
      <EcommerceHeader />

      {/* Main Content */}
      <main className="flex-grow-1">
        <div className="container-fluid py-4">
          <div className="row">
            {/* Sidebar Component */}
            <Sidebar 
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />

            {/* Products Section */}
            <div className="col-lg-9">
              {/* Products Header */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h2 className="h3 fw-bold text-dark mb-1">
                    {selectedCategory === 'all' ? 'All Products' :
                      categories.find(c => c.id === selectedCategory)?.name}
                  </h2>
                  <p className="text-muted mb-0">
                    {loading ? 'Loading...' : `${filteredProducts.length} products found`}
                  </p>
                </div>
              </div>

              {/* Products Display */}
              <div className="row">
                {loading ? (
                  // Loading Skeletons
                  <>
                    {[...Array(6)].map((_, i) => (
                      <LoadingSkeleton key={i} />
                    ))}
                  </>
                ) : filteredProducts.length === 0 ? (
                  // No Products Found
                  <div className="col-12">
                    <div className="text-center py-5">
                      <div className="display-1 text-muted mb-3">🔍</div>
                      <h3 className="h4 fw-semibold text-dark mb-2">No products found</h3>
                      <p className="text-muted">Try adjusting your search or filter criteria</p>
                    </div>
                  </div>
                ) : (
                  // Products Grid
                  <>
                    {filteredProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Component */}
      <EcommerceFooter />
    </div>
  );
};

// Cart Page Layout Component
const CartPageLayout = () => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Header for Cart Page */}
      <Header />
      
      {/* Main Cart Content */}
      <main className="flex-grow-1">
        <CartPage />
      </main>

      {/* Footer Component */}
      <EcommerceFooter />
    </div>
  );
};

// Main App Component
function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPageLayout />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;