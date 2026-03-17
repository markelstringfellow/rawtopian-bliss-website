/* VERSION 3.0 - FIXED VALIDATION LOGIC */
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './GetDelivered.css';
import RawtopianTransparentLogo from './assets/RawtopianFinalLogotransparent.png'; 

// ASSET IMPORTS
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
import CashAppQR from './assets/cashapp_qr.jpg';

const GetDelivered = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedItems, setSelectedItems] = useState({});
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', phone: '' });
  const [orderComplete, setOrderComplete] = useState(false);
  const [isSending, setIsSending] = useState(false);

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

  const locations = ['Charlotte', 'Rock Hill', 'Columbia', 'Sumter', 'Bamberg'];
  const packages = [
    { name: 'A La Carte', count: 0, price: 0, isALaCarte: true, description: 'Order any number of meals at individual prices.' },
    { name: 'Pick 6', count: 6, price: 99, isALaCarte: false, description: 'Choose 6 delicious items.' },
    { name: 'Pick 12', count: 12, price: 175, isALaCarte: false, description: 'Choose 12 delicious items.' },
  ];

  const handleItemChange = (itemId, change) => {
    const currentCount = selectedItems[itemId] || 0;
    const newCount = currentCount + change;
    if (newCount < 0) return;
    
    const totalSelected = Object.values(selectedItems).reduce((sum, count) => sum + count, 0) + change;
    if (selectedPackage && !selectedPackage.isALaCarte && totalSelected > selectedPackage.count) return;

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
  
  const totalCost = useMemo(() => {
    if (selectedPackage && selectedPackage.isALaCarte) {
      return Object.entries(selectedItems).reduce((sum, [id, count]) => {
        const item = foodItems.find(i => i.id === parseInt(id));
        return sum + (item ? item.price * count : 0);
      }, 0);
    }
    return selectedPackage ? selectedPackage.price : 0;
  }, [selectedPackage, selectedItems, foodItems]);

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setSelectedItems({});
  };

  const handleLocationSelect = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleCustomerInfoChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleProceedToCheckout = async () => {
    // FIXED VALIDATION LOGIC
    if (!selectedPackage || !selectedLocation) {
      alert("Please select a package and a delivery location.");
      return;
    }
    
    if (selectedPackage.isALaCarte) {
      if (totalSelectedItems === 0) {
        alert("Please select at least one item for the A La Carte package.");
        return;
      }
    } else {
      if (totalSelectedItems !== selectedPackage.count) {
        alert(`Please select exactly ${selectedPackage.count} items for the ${selectedPackage.name} package.`);
        return;
      }
    }

    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      alert("Please fill in all customer information fields.");
      return;
    }

    setIsSending(true);

    const itemDetails = Object.entries(selectedItems)
      .map(([id, count]) => {
        const item = foodItems.find(i => i.id === parseInt(id));
        return `${item.name} (x${count})`;
      })
      .join(', ');

    const formData = {
      name: customerInfo.name,
      email: customerInfo.email,
      phone: customerInfo.phone,
      delivery_location: selectedLocation,
      order_details: `DELIVERED ORDER | Package: ${selectedPackage.name} | Items: ${itemDetails}`,
      total_price: `$${totalCost.toFixed(2)}`
    };

    try {
      const response = await fetch('https://formspree.io/f/xjgaprbq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData )
      });

      if (response.ok) {
        alert(`Order Submitted Successfully!\n\nYour order details have been sent to Chef Saa. Please complete your payment of $${totalCost.toFixed(2)} via Cash App to $VeganLife007.`);
        setOrderComplete(true);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send order.');
      }
    } catch (error) {
      console.error('Formspree Error:', error);
      alert("Error: " + error.message);
    } finally {
      setIsSending(false);
    }
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
            <h2>Order Submitted!</h2>
            <p>Thank you for your order. Please send payment via Cash App to <strong>$VeganLife007</strong></p>
            <p>Include your name and order details in the payment note.</p>
            <p>Total Amount: ${totalCost.toFixed(2)}</p>
            <Link to="/" className="return-home-button">Return to Home</Link>
          </div>
        ) : (
          <>
            <div className="delivery-hero">
              <h1 className="delivery-title">GET DELIVERED</h1>
              <p className="delivery-subtitle">Fresh, raw vegan meals delivered to your door</p>
            </div>

            <div className="selection-section">
              <label htmlFor="location">Select Your Location:</label>
              <select id="location" value={selectedLocation} onChange={handleLocationSelect} className="delivery-select">
                <option value="" disabled>Choose a city...</option>
                {locations.map(loc => (<option key={loc} value={loc}>{loc}</option>))}
              </select>
            </div>

            <div className="package-selection">
              <h2>Select Your Package:</h2>
              <div className="package-options three-wide"> 
                {packages.map(pkg => (
                  <div key={pkg.name} className={`package-card ${selectedPackage && selectedPackage.name === pkg.name ? 'selected' : ''}`} onClick={() => handlePackageSelect(pkg)}>
                    <h3>{pkg.name}</h3>
                    <p className="package-price">{pkg.isALaCarte ? 'Individual Pricing' : `$${pkg.price}`}</p>
                    <p className="package-description">{pkg.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {selectedPackage && (
              <div className="food-selection-section">
                <h2>Select Your Items</h2>
                <p className="selection-counter">{selectedPackage.isALaCarte ? `Total Items: ${totalSelectedItems}` : `Selected: ${totalSelectedItems} / ${selectedPackage.count}`}</p>
                <div className="food-grid">
                  {foodItems.map(item => (
                    <div key={item.id} className="food-card">
                      <img src={item.image} alt={item.name} />
                      <h3>{item.name}</h3>
                      {selectedPackage.isALaCarte && <p className="food-price">${item.price.toFixed(2)}</p>}
                      <div className="item-controls">
                        <button onClick={() => handleItemChange(item.id, -1)} disabled={!selectedItems[item.id]}>-</button>
                        <span>{selectedItems[item.id] || 0}</span>
                        <button onClick={() => handleItemChange(item.id, 1)} disabled={!selectedPackage.isALaCarte && totalSelectedItems >= selectedPackage.count}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedPackage && selectedLocation && (
              <>
                <div className="customer-info-section">
                  <h2>Customer Information</h2>
                  <div className="customer-info-form">
                    <input type="text" name="name" placeholder="Full Name" value={customerInfo.name} onChange={handleCustomerInfoChange} required />
                    <input type="email" name="email" placeholder="Email Address" value={customerInfo.email} onChange={handleCustomerInfoChange} required />
                    <input type="tel" name="phone" placeholder="Phone Number" value={customerInfo.phone} onChange={handleCustomerInfoChange} required />
                  </div>
                </div>

                <div className="payment-section">
                  <h2>Payment</h2>
                  <div className="payment-container">
                    <div className="payment-info">
                      <h3>Order Total: ${totalCost.toFixed(2)}</h3>
                      <p className="payment-instructions">Send payment via Cash App to <strong>$VeganLife007</strong></p>
                      <img src={CashAppQR} alt="Cash App QR Code" className="qr-code" />
                    </div>
                  </div>
                  <button onClick={handleProceedToCheckout} className="checkout-button" disabled={isSending}>
                    {isSending ? "Sending Order..." : `Confirm Order - $${totalCost.toFixed(2)}`}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default GetDelivered;
