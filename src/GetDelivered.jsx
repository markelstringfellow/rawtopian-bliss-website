import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './GetDelivered.css';
import RawtopianTransparentLogo from './assets/RawtopianFinalLogotransparent.png';

// CORRECTED IMPORTS: Changed from '../assets/FoodX.JPG' to './assets/FoodX.JPG'
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

// CheckoutForm removed for testing

const GetDelivered = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedItems, setSelectedItems] = useState({});
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', phone: '' });
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const foodItems = [
    { id: 1, name: "Rainbow Salad", image: Food1, price: 14.99 },
    { id: 2, name: "Mock Chiken Salad Wrap", image: Food2, price: 14.99 },
    { id: 3, name: "Crabcakes", image: Food3, price: 15.99 },
    { id: 4, name: "Seafood Celebration", image: Food4, price: 16.99 },
    { id: 5, name: "Carolina Black Bean Burger With Side Salad", image: Food5, price: 14.99 },
    { id: 6, name: "Stuffed Peppers", image: Food6, price: 15.99 },
    { id: 7, name: "7-Layer Lasagna", image: Food7, price: 18.50 },
    { id: 8, name: "Personal Pan Pizza", image: Food8, price: 14.99 },
    { id: 9, name: "Taco Bliss Bowl", image: Food9, price: 15.99 },
    { id: 10, name: "Sushi Roll Platter", image: Food10, price: 13.00 },
    { id: 11, name: "Raw Vegan Pizza", image: Food11, price: 14.99 },
    { id: 12, name: "Avocado Sushi Rolls", image: Food12, price: 13.00 }
  ];

// FIXED SYNTAX ERROR AND APPLIED PRICE UPDATE
  const locations = ['Charlotte', 'Rock Hill', 'Columbia'];
  const packages = [
    { name: 'Pick 6', count: 6, price: 99, 'isA La Carte': false },
    { name: 'Pick 12', count: 12, price: 175, 'isA La Carte': false }, // Price updated to $175
    // A La Carte package will be added in a later step
  ];

  const handleItemChange = (itemId, change) => {
    const currentCount = selectedItems[itemId] || 0;
    const newCount = currentCount + change;

    if (newCount < 0) return;

    const totalSelected = Object.values(selectedItems).reduce((sum, count) => sum + count, 0) + change;
    
    if (selectedPackage && !selectedPackage['isA La Carte'] && totalSelected > selectedPackage.count) return;

    setSelectedItems(prev => {
      const newItems = { ...prev };
      if (newCount === 0) {
        delete newItems[itemId];
      } else {
        newItems[itemId] = newCount;
      }
      return newItems;
    });
  };

  const totalSelectedItems = Object.values(selectedItems).reduce((sum, count) => sum + count, 0);
  const isSelectionComplete = selectedPackage && totalSelectedItems === selectedPackage.count;
  const totalCost = selectedPackage && selectedPackage['isA La Carte']
    ? Object.entries(selectedItems).reduce((sum, [id, count]) => {
        const item = foodItems.find(i => i.id === parseInt(id));
        return sum + (item ? item.price * count : 0);
      }, 0)
    : selectedPackage ? selectedPackage.price : 0;

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setSelectedItems({}); // Reset items when package changes
  };

  const handleLocationSelect = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleCustomerInfoChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleProceedToCheckout = () => {
    if (!selectedPackage || !selectedLocation || (!selectedPackage['isA La Carte'] && totalSelectedItems !== selectedPackage.count)) {
      alert("Please select a package, a delivery location, and the correct number of items.");
      return;
    }
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      alert("Please fill in all customer information fields.");
      return;
    }
    // For now, we skip the Stripe checkout part to stabilize the app
    alert(`Order Summary:\nPackage: ${selectedPackage.name}\nCity: ${selectedLocation}\nTotal Price: $${totalCost.toFixed(2)}\n(Stripe payment integration would go here)`);
    // setShowCheckout(true);
  };

  const orderDetails = {
    package: selectedPackage,
    location: selectedLocation,
    items: selectedItems,
    customer: customerInfo,
    total: totalCost
  };

  return (
    <div className="get-delivered">
      <header className="App-header">
        <nav className="horizontal-nav">
          <Link to="/" className="nav-link">HOME</Link>
          <Link to="/#menu" className="nav-link">MENU</Link>
          <img src={RawtopianTransparentLogo} alt="Rawtopian Bliss Logo" className="center-logo" />
          <Link to="/#about" className="nav-link">ABOUT</Link>
          <Link to="/#contact" className="nav-link">CONTACT</Link>
        </nav>
      </header>

      <main className="main-content">
        {orderComplete ? (
          <div className="order-complete-message">
            <h2>Order Complete!</h2>
            <p>Thank you for your order. You will receive a confirmation email shortly.</p>
            <p>Total Paid: ${totalCost.toFixed(2)}</p>
          </div>
        ) : showCheckout ? (
          <div className="checkout-section">
            {/* Checkout form JSX removed for stability */}
          </div>
        ) : (
          <>
            <div className="delivery-hero">
              <h1>GET DELIVERED</h1>
              <p>Fresh, raw vegan meals delivered to your door</p>
            </div>

            <div className="location-select-section">
              <h2>Select Your Location:</h2>
              <div className="location-select">
                <select id="location" value={selectedLocation} onChange={handleLocationSelect}>
                  <option value="" disabled>Choose a city...</option>
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="package-selection">
              <h2>Select Your Package:</h2>
              <div className="package-options">
                {packages.map(pkg => (
                  <div
                    key={pkg.name}
                    className={`package-card ${selectedPackage && selectedPackage.name === pkg.name ? 'selected' : ''}`}
                    onClick={() => handlePackageSelect(pkg)}
                  >
                    <h3>{pkg.name}</h3>
                    <p className="package-price">${pkg.price}</p>
                    <p>{pkg.count} Meals</p>
                  </div>
                ))}
              </div>
            </div>

            {selectedPackage && (
              <div className="food-selection-section">
                <h2>2. Select Your Items</h2>
                <p className="selection-counter">
                  Selected: {totalSelectedItems} {selectedPackage['isA La Carte'] ? '' : `/ ${selectedPackage.count}`}
                </p>
                <div className="food-grid">
                  {foodItems.map(item => (
                    <div key={item.id} className="food-card">
                      <img src={item.image} alt={item.name} />
                      <h3>{item.name}</h3>
                      <p className="food-price">${item.price.toFixed(2)}</p>
                      <div className="item-controls">
                        <button onClick={() => handleItemChange(item.id, -1)} disabled={!selectedItems[item.id]}>-</button>
                        <span>{selectedItems[item.id] || 0}</span>
                        <button onClick={() => handleItemChange(item.id, 1)} disabled={!selectedPackage['isA La Carte'] && totalSelectedItems >= selectedPackage.count}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedPackage && selectedLocation && (
              <div className="customer-info-section">
                <h2>3. Customer Information</h2>
                <div className="customer-info-form">
                  <h3>Customer Details</h3>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={customerInfo.name}
                    onChange={handleCustomerInfoChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={customerInfo.email}
                    onChange={handleCustomerInfoChange}
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={customerInfo.phone}
                    onChange={handleCustomerInfoChange}
                    required
                  />
                  <button onClick={handleProceedToCheckout} className="checkout-button">
                    Proceed to Checkout - ${totalCost.toFixed(2)}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default GetDelivered;
