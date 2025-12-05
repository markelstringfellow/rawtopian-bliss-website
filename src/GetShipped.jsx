import React, { useState, useMemo } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './GetShipped.css';
import RawtopianTransparentLogo from './assets/RawtopianFinalLogotransparent.png';

// Import new bulk item images
import BrowniesImage from './assets/shipped/PureProteinRawBrownies.JPG';
import BurgersImage from './assets/shipped/BlackBeanBurgers.JPG';
import SeafoodImage from './assets/shipped/SeafoodCelebration.JPG';
import ShepherdsPieImage from './assets/shipped/SheperdsPie.JPG';

// Initialize Stripe - You'll need to replace this with your actual publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_YOUR_KEY_HERE');

// Helper function to calculate the price for Black Bean Burgers based on quantity
const calculateBlackBeanBurgerPrice = (quantity) => {
  const bulkPrice = 40.00; // Price for 12
  const smallPrice = 15.00; // Price for 4
  
  // Calculate how many full 12-packs
  const packsOf12 = Math.floor(quantity / 12);
  let remaining = quantity % 12;
  let totalPrice = packsOf12 * bulkPrice;

  // Calculate how many full 4-packs from the remainder
  const packsOf4 = Math.floor(remaining / 4);
  totalPrice += packsOf4 * smallPrice;

  // Note: The user specified 4 for $15 and 12 for $40. Assuming orders must be in multiples of 4.
  if (remaining % 4 !== 0) {
    // This case should ideally be prevented by the quantity controls, but for safety:
    console.error("Invalid quantity for Black Bean Burgers. Must be a multiple of 4.");
  }

  return totalPrice;
};

function CheckoutForm({ orderDetails, onSuccess, onCancel }) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    addressLine1: '',
    city: '',
    state: '',
    zip: ''
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
          amount: Math.round(orderDetails.price * 100), // Convert to cents
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
                line1: customerInfo.addressLine1,
                city: customerInfo.city,
                state: customerInfo.state,
                postal_code: customerInfo.zip,
                country: 'US' // Assuming US shipping for now
              },
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
      <h2>Complete Your Shipping Order</h2>
      
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
        <label>Shipping Address Line 1 *</label>
        <input
          type="text"
          value={customerInfo.addressLine1}
          onChange={(e) => setCustomerInfo({ ...customerInfo, addressLine1: e.target.value })}
          required
        />
      </div>

      <div className="form-group-row">
        <div className="form-group">
          <label>City *</label>
          <input
            type="text"
            value={customerInfo.city}
            onChange={(e) => setCustomerInfo({ ...customerInfo, city: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>State *</label>
          <input
            type="text"
            value={customerInfo.state}
            onChange={(e) => setCustomerInfo({ ...customerInfo, state: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Zip Code *</label>
          <input
            type="text"
            value={customerInfo.zip}
            onChange={(e) => setCustomerInfo({ ...customerInfo, zip: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <p><strong>Shipping Order</strong></p>
        <p><strong>Items:</strong></p>
        <ul>
          {orderDetails.items.map((item, index) => (
            <li key={index}>
              {item.name} x {item.quantity} (Total Price: ${item.price.toFixed(2)})
            </li>
          ))}
        </ul>
        {orderDetails.comments && (
          <p><strong>Comments:</strong> {orderDetails.comments}</p>
        )}
        <p className="total-price"><strong>Total: ${orderDetails.price.toFixed(2)}</strong></p>
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
          {processing ? 'Processing...' : `Pay $${orderDetails.price.toFixed(2)}`}
        </button>
      </div>

      <p className="secure-payment-notice">
        🔒 Secure payment powered by Stripe
      </p>
    </form>
  );
}

function GetShipped() {
  const [comments, setComments] = useState('');
  const [selectedItems, setSelectedItems] = useState({});
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const foodItems = [
    {
      id: 1,
      name: "Pure Protein Raw Brownies",
      image: BrowniesImage,
      description: "A dozen of these scrumptious chewy chocolate delights, made from all nuts. No soy, no wheat, and Gluten Free!!",
      unit: 12,
      pricePerUnit: 27.50,
      pricingType: 'fixed',
    },
    {
      id: 2,
      name: "Black Bean Burgers",
      image: BurgersImage,
      description: "These robust burgers are hand pattied, made from organic black beans, quinoa, savory herbs and spices. Seasoned to perfection.",
      unit: 4,
      pricingType: 'tiered',
    },
    {
      id: 3,
      name: "Seafood Celebration",
      image: SeafoodImage,
      description: "These tasty seafood patties are made from carrots and parsnips, celery, onions, sea veggies, herbs and spices. Our Mock Tuna base is the foundation for this divinely delish seafood delight. Breaded and dehydrated for just the right texture.",
      unit: 6,
      pricePerUnit: 21.00,
      pricingType: 'fixed',
    },
    {
      id: 4,
      name: "Shepherds Pies",
      image: ShepherdsPieImage,
      description: "Our vegan tortilla shell is stuffed with our plantbased meaty mix (cauliflower, carrots, sweet peas, fresh herbs and spices) sealed tight with our Sunseed Cheeze.",
      unit: 4,
      pricePerUnit: 28.00,
      pricingType: 'fixed',
    }
  ];

  const getItemPrice = (item, quantity) => {
    if (quantity === 0) return 0;

    if (item.pricingType === 'fixed') {
      const numUnits = quantity / item.unit;
      return numUnits * item.pricePerUnit;
    } else if (item.pricingType === 'tiered' && item.name === 'Black Bean Burgers') {
      return calculateBlackBeanBurgerPrice(quantity);
    }
    return 0;
  };

  const handleItemChange = (itemId, change) => {
    const item = foodItems.find(i => i.id === itemId);
    if (!item) return;

    const currentCount = selectedItems[itemId] || 0;
    let newCount = currentCount + (change * item.unit);
    
    // Ensure quantity is non-negative and a multiple of the unit size
    newCount = Math.max(0, newCount);
    newCount = Math.floor(newCount / item.unit) * item.unit;

    setSelectedItems({
      ...selectedItems,
      [itemId]: newCount
    });
  };

  const getTotalSelectedItems = () => {
    return Object.values(selectedItems).reduce((sum, count) => sum + count, 0);
  };

  const getTotalPrice = useMemo(() => {
    return foodItems.reduce((total, item) => {
      const quantity = selectedItems[item.id] || 0;
      return total + getItemPrice(item, quantity);
    }, 0);
  }, [selectedItems]);

  const handleCheckout = () => {
    if (getTotalSelectedItems() === 0) {
      alert('Please select at least one item to ship.');
      return;
    }

    setShowCheckout(true);
  };

  const handlePaymentSuccess = () => {
    setOrderComplete(true);
    setShowCheckout(false);
  };

  const orderDetails = {
    type: 'Shipped Order',
    price: getTotalPrice,
    items: foodItems
      .filter(item => selectedItems[item.id] > 0)
      .map(item => ({
        name: item.name,
        quantity: selectedItems[item.id],
        price: getItemPrice(item, selectedItems[item.id])
      })),
    comments: comments
  };

  if (orderComplete) {
    return (
      <div className="get-shipped">
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
            <p>Thank you for your bulk shipping order! We've sent a confirmation email with all the details.</p>
            <p>Your delicious raw vegan meals will be shipped soon!</p>
            <button className="home-btn" onClick={() => window.location.href = '/'}>
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="get-shipped">
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
        <h1 className="delivery-title">Get Shipped (Bulk Orders)</h1>
        <p className="delivery-subtitle">Nationwide shipping for our bulk raw vegan items</p>

        {/* Food Selection */}
        <div className="food-selection-section">
          <h2>Select Your Items</h2>
          <p className="selection-counter">
            Total Items: {getTotalSelectedItems()} | Total Price: ${getTotalPrice.toFixed(2)}
          </p>

          <div className="food-selection-grid">
            {foodItems.map(item => (
              <div key={item.id} className="food-selection-item">
                <img src={item.image} alt={item.name} />
                <h3>{item.name}</h3>
                <p className="item-description">{item.description}</p>
                <p className="item-pricing">
                  {item.name === 'Black Bean Burgers' 
                    ? '4 for $15.00, 12 for $40.00' 
                    : `${item.unit} for $${item.pricePerUnit.toFixed(2)}`}
                </p>
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn minus"
                    onClick={() => handleItemChange(item.id, -1)}
                    disabled={!selectedItems[item.id]}
                  >
                    −{item.unit}
                  </button>
                  <span className="quantity-display">
                    {selectedItems[item.id] || 0}
                  </span>
                  <button 
                    className="quantity-btn plus"
                    onClick={() => handleItemChange(item.id, 1)}
                  >
                    +{item.unit}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

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
        {getTotalSelectedItems() > 0 && (
          <div className="checkout-section">
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout - ${getTotalPrice.toFixed(2)}
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

export default GetShipped;
