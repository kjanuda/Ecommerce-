import React from 'react';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();
  const navigate = useNavigate();

  if (cart.items.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <ShoppingBag size={64} className="text-muted mb-3" />
          <h3 className="text-muted">Your cart is empty</h3>
          <p className="text-muted">Add some products to get started!</p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Shopping Cart ({getTotalItems()} items)</h2>
      
      <div className="row">
        <div className="col-lg-8">
          {cart.items.map(item => (
            <div key={item.id} className="card mb-3">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="img-fluid rounded"
                    />
                  </div>
                  <div className="col-md-4">
                    <h6 className="mb-1">{item.title}</h6>
                    <small className="text-muted">{item.category}</small>
                  </div>
                  <div className="col-md-2">
                    <div className="d-flex align-items-center">
                      <button 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="mx-3">{item.quantity}</span>
                      <button 
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  </div>
                  <div className="col-md-2">
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong>${getTotalPrice().toFixed(2)}</strong>
              </div>
              <button className="btn btn-primary w-100 mb-2">
                Proceed to Checkout
              </button>
              <button 
                className="btn btn-outline-secondary w-100"
                onClick={() => navigate('/')}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;