import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './GetDelivered.css';
import RawtopianTransparentLogo from './assets/RawtopianFinalLogotransparent.png';

import Food1 from './assets/Food1.JPG';
import Food2 from './assets/Food2.JPG';
import Food3 from './assets/Food3.JPG';
import Food4 from './assets/Food4.JPG';
import Food5 from './assets/Food5.JPG';
import Food6 from './assets/Food6.JPG';
import Food7 from './assets/Food7.JPG';
import Food8 from './assets/Food8.JPG';
import Food9 from './assets/Food9.JPG';
import Food10 from './assets/Food10.JPG';
import Food11 from './assets/Food11.JPG';
import Food12 from './assets/Food12.JPG';

// Initialize Stripe - You'll need to replace this with your actual publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_YOUR_KEY_HERE');

function CheckoutForm({ orderDetails, onSuccess, onCancel }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Create payment intent on the backend
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: orderDetails.price * 100, // Convert to cents
          orderDetails: {
            ...orderDetails,
            customer: customerInfo
          }
        }),
      });

      const { clientSecret, error: backendError } = await response.json();

      if (backendError) {
        setError(backendError);
        setProcessing(false);
        return;
      }

      // Confirm the payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: customerInfo.name,
              email: customerInfo.email,
              phone: customerInfo.phone,
              address: {
                line1: customerInfo.address
              }
            },
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message);
        setProcessing(false);
      } else if (paymentIntent.status === 'succeeded') {
        // Send order confirmation email
        await fetch('/api/send-order-confirmation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...orderDetails,
            customer: customerInfo,
            paymentIntentId: paymentIntent.id
          }),
        });

        onSuccess();
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2>Complete Your Order</h2>
      
      <div className="form-group">
        <label>Full Name *</label>
        <input
          type="text"
          value={customerInfo.name}
          onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>Email *</label>
        <input
          type="email"
          value={customerInfo.email}
          onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>Phone Number *</label>
        <input
          type="tel"
          value={customerInfo.phone}
          onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
          required
        />
      </div>

      <div className="form-group">
        <label>Delivery Address *</label>
        <textarea
          value={customerInfo.address}
          onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
          rows="3"
          required
        />
      </div>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <p><strong>Location:</strong> {orderDetails.location}</p>
        <p><strong>Package:</strong> {orderDetails.package}</p>
        <p><strong>Items:</strong></p>
        <ul>
          {orderDetails.items.map((item, index) => (
            <li key={index}>
              {item.name} x {item.quantity}
            </li>
          ))}
        </ul>
        {orderDetails.comments && (
          <p><strong>Comments:</strong> {orderDetails.comments}</p>
        )}
        <p className="total-price"><strong>Total: ${orderDetails.price}</strong></p>
      </div>

      <div className="form-group">
        <label>Card Information *</label>
        <div className="card-element-container">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="checkout-buttons">
        <button type="button" className="cancel-btn" onClick={onCancel} disabled={processing}>
          Cancel
        </button>
        <button type="submit" className="submit-order-btn" disabled={processing || !stripe}>
          {processing ? 'Processing...' : `Pay $${orderDetails.price}`}
        </button>
      </div>

      <p className="secure-payment-notice">
        🔒 Secure payment powered by Stripe
      </p>
    </form>
  );
}

function GetDelivered() {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [comments, setComments] = useState('');
  const [selectedItems, setSelectedItems] = useState({});
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const foodItems = [
    { id: 1, name: "Rainbow Salad Bowl", image: Food1 },
    { id: 2, name: "Raw Veggie Burger", image: Food2 },
    { id: 3, name: "Mac & Cheese Plate", image: Food3 },
    { id: 4, name: "Crusted Protein Plate", image: Food4 },
    { id: 5, name: "Raw Vegan Burgers", image: Food5 },
    { id: 6, name: "Stuffed Bell Peppers", image: Food6 },
    { id: 7, name: "Loaded Nachos", image: Food7 },
    { id: 8, name: "Gourmet Meal Box", image: Food8 },
    { id: 9, name: "Nacho Supreme", image: Food9 },
    { id: 10, name: "Sushi Roll Platter", image: Food10 },
    { id: 11, name: "Raw Vegan Pizza", image: Food11 },
    { id: 12, name: "Avocado Sushi Rolls", image: Food12 }
  ];

  const locations = ['Charlotte', 'Rock Hill', 'Columbia'];
  const packages = [
    { name: 'Pick 6', count: 6, price: 99 },
    { name: 'Pick 12', count: 12, price: 149 }
  ];

  const handleItemChange = (itemId, change) => {
    const currentCount = selectedItems[itemId] || 0;
    const newCount = Math.max(0, currentCount + change);
    
    setSelectedItems({
      ...selectedItems,
      [itemId]: newCount
    });
  };

  const getTotalSelectedItems = () => {
    return Object.values(selectedItems).reduce((sum, count) => sum + count, 0);
  };

  const getMaxItems = () => {
    const pkg = packages.find(p => p.name === selectedPackage);
    return pkg ? pkg.count : 0;
  };

  const getPrice = () => {
    const pkg = packages.find(p => p.name === selectedPackage);
    return pkg ? pkg.price : 0;
  };

  const canAddMore = () => {
    return getTotalSelectedItems() < getMaxItems();
  };

  const handleCheckout = () => {
    if (!selectedLocation || !selectedPackage) {
      alert('Please select a location and package');
      return;
    }

    if (getTotalSelectedItems() !== getMaxItems()) {
      alert(`Please select exactly ${getMaxItems()} items for your ${selectedPackage} package`);
      return;
    }

    setShowCheckout(true);
  };

  const handlePaymentSuccess = () => {
    setOrderComplete(true);
    setShowCheckout(false);
  };

  const orderDetails = {
    location: selectedLocation,
    package: selectedPackage,
    price: getPrice(),
    items: foodItems
      .filter(item => selectedItems[item.id] > 0)
      .map(item => ({
        name: item.name,
        quantity: selectedItems[item.id]
      })),
    comments: comments
  };

  if (orderComplete) {
    return (
      <div className="get-delivered">
        <header className="App-header">
          <nav className="horizontal-nav">
            <a href="/" className="nav-link">HOME</a>
            <a href="/#menu" className="nav-link">MENU</a>
            <img src={RawtopianTransparentLogo} alt="Rawtopian Bliss Logo" className="center-logo" />
            <a href="/#about" className="nav-link">ABOUT</a>
            <a href="/#contact" className="nav-link">CONTACT</a>
          </nav>
        </header>
        <div className="delivery-container">
          <div className="order-success">
            <h1>🎉 Order Confirmed!</h1>
            <p>Thank you for your order! We've sent a confirmation email with all the details.</p>
            <p>Your delicious raw vegan meals will be delivered soon!</p>
            <button className="home-btn" onClick={() => window.location.href = '/'}>
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="get-delivered">
      {/* Header */}
      <header className="App-header">
        <nav className="horizontal-nav">
          <a href="/" className="nav-link">HOME</a>
          <a href="/#menu" className="nav-link">MENU</a>
          <img src={RawtopianTransparentLogo} alt="Rawtopian Bliss Logo" className="center-logo" />
          <a href="/#about" className="nav-link">ABOUT</a>
          <a href="/#contact" className="nav-link">CONTACT</a>
        </nav>
      </header>

      <div className="delivery-container">
        <h1 className="delivery-title">Get Delivered</h1>
        <p className="delivery-subtitle">Fresh, raw vegan meals delivered to your door</p>

        {/* Location Selection */}
        <div className="selection-section">
          <label htmlFor="location">Select Your Location:</label>
          <select 
            id="location"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="delivery-select"
          >
            <option value="">Choose a city...</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        {/* Package Selection */}
        <div className="selection-section">
          <label>Select Your Package:</label>
          <div className="package-options">
            {packages.map(pkg => (
              <div 
                key={pkg.name}
                className={`package-card ${selectedPackage === pkg.name ? 'selected' : ''}`}
                onClick={() => setSelectedPackage(pkg.name)}
              >
                <h3>{pkg.name}</h3>
                <p className="package-price">${pkg.price}</p>
                <p className="package-description">Choose {pkg.count} delicious items</p>
              </div>
            ))}
          </div>
        </div>

        {/* Food Selection */}
        {selectedPackage && (
          <div className="food-selection-section">
            <h2>Select Your Items</h2>
            <p className="selection-counter">
              Selected: {getTotalSelectedItems()} / {getMaxItems()}
            </p>

            <div className="food-selection-grid">
              {foodItems.map(item => (
                <div key={item.id} className="food-selection-item">
                  <img src={item.image} alt={item.name} />
                  <h3>{item.name}</h3>
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn minus"
                      onClick={() => handleItemChange(item.id, -1)}
                      disabled={!selectedItems[item.id]}
                    >
                      −
                    </button>
                    <span className="quantity-display">
                      {selectedItems[item.id] || 0}
                    </span>
                    <button 
                      className="quantity-btn plus"
                      onClick={() => handleItemChange(item.id, 1)}
                      disabled={!canAddMore()}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comments Section */}
        <div className="comments-section">
          <label htmlFor="comments">Questions or Special Requests:</label>
          <textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Let us know if you have any questions, dietary restrictions, or special requests..."
            rows="4"
          />
        </div>

        {/* Checkout Button */}
        {selectedPackage && getTotalSelectedItems() === getMaxItems() && (
          <div className="checkout-section">
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout - ${getPrice()}
            </button>
          </div>
        )}

        {/* Checkout Modal with Stripe */}
        {showCheckout && (
          <div className="checkout-modal">
            <div className="checkout-modal-content">
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  orderDetails={orderDetails}
                  onSuccess={handlePaymentSuccess}
                  onCancel={() => setShowCheckout(false)}
                />
              </Elements>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GetDelivered;

