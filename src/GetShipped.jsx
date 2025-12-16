import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import './GetShipped.css';
import RawtopianTransparentLogo from './assets/RawtopianFinalLogotransparent.png';

// CORRECTED IMPORTS: Path now includes 'shipped/' and extension is uppercase '.JPG'
import BlackBeanBurgers from './assets/shipped/BlackBeanBurgers.JPG';
import SeafoodCelebration from './assets/shipped/SeafoodCelebration.JPG';
import SheperdsPie from './assets/shipped/SheperdsPie.JPG';
import PureProteinRawBrownies from './assets/shipped/PureProteinRawBrownies.JPG';

const GetShipped = () => {
  const [addressInfo, setAddressInfo] = useState({
    address: '',
    zipcode: '',
    city: '',
    state: ''
  });
  const [selectedItems, setSelectedItems] = useState({});
  const [customerInfo, setCustomerInfo] = useState({ name: '', email: '', phone: '' });
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const shippedItems = [
    { 
      id: 1, 
      name: "Black Bean Burgers", 
      image: BlackBeanBurgers, 
      description: "These robust burgers are hand pattied, made from organic black beans, quinoa, savory herbs and spices. Seasoned to perfection.", 
      multiples: 4, 
      pricing: [
        { count: 4, price: 15.00 },
        { count: 12, price: 40.00 }
      ]
    },
    { 
      id: 2, 
      name: "Seafood Celebration", 
      image: SeafoodCelebration, 
      description: "These tasty seafood patties are made from carrots and parsnips, celery, onions, sea veggies, herbs and spices. Our Mock Tuna base is the foundation for this divinely delish seafood delight. Breaded and dehydrated for just the right texture.", 
      multiples: 6, 
      pricing: [
        { count: 6, price: 21.00 }
      ]
    },
    { 
      id: 3, 
      name: "Shepherds Pie", 
      image: SheperdsPie, 
      description: "Our vegan tortilla shell is stuffed with our plantbased meaty mix (cauliflower, carrots, sweet peas, fresh herbs and spices) sealed tight with our Sunseed Cheeze.", 
      multiples: 4, 
      pricing: [
        { count: 4, price: 28.00 }
      ]
    },
    { 
      id: 4, 
      name: "Pure Protein Raw Brownies", 
      image: PureProteinRawBrownies, 
      description: "A delicious, raw, and protein-packed treat. Description coming soon.", 
      multiples: 2, 
      pricing: [
        { count: 2, price: 10.00 },
        { count: 4, price: 18.00 }
      ]
    },
  ];

  const handleAddressChange = (e) => {
    setAddressInfo({ ...addressInfo, [e.target.name]: e.target.value });
  };

  const handleCustomerInfoChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const handleItemChange = (itemId, change) => {
    const item = shippedItems.find(i => i.id === itemId);
    if (!item) return;

    const currentCount = selectedItems[itemId]?.count || 0;
    const newCount = currentCount + (change * item.multiples);

    if (newCount < 0) return;

    setSelectedItems(prev => {
      const newItems = { ...prev };
      if (newCount === 0) {
        delete newItems[itemId];
      } else {
        // Find the best price for the new count
        const bestPriceOption = item.pricing
          .filter(p => newCount >= p.count)
          .sort((a, b) => b.count - a.count)[0];
        
        // Simple calculation: total price is based on the highest count option that fits
        // For simplicity, we'll calculate the price based on the number of *multiples* ordered
        const unitPrice = item.pricing[0].price / item.pricing[0].count; // Price per single item
        let calculatedPrice = newCount * unitPrice;

        if (bestPriceOption) {
            // This logic is complex for a simple component. Let's simplify to just tracking the count.
            // The final price calculation will be done in the totalCost memo.
        }

        newItems[itemId] = {
            count: newCount,
            item: item // Store item details for easy access
        };
      }
      return newItems;
    });
  };

  const totalCost = useMemo(() => {
    return Object.values(selectedItems).reduce((sum, selection) => {
      const item = selection.item;
      const count = selection.count;
      let itemTotal = 0;

      // Find the best pricing option for the total count
      const bestPricing = item.pricing
        .filter(p => count >= p.count)
        .sort((a, b) => b.count - a.count);

      if (bestPricing.length > 0) {
        // Use the best price option to calculate the total cost
        const bestOption = bestPricing[0];
        const numBestOptions = Math.floor(count / bestOption.count);
        const remainder = count % bestOption.count;
        
        itemTotal = numBestOptions * bestOption.price;
        
        // For the remainder, use the smallest multiple's unit price
        if (remainder > 0) {
            const smallestOption = item.pricing.sort((a, b) => a.count - b.count)[0];
            const unitPrice = smallestOption.price / smallestOption.count;
            itemTotal += remainder * unitPrice;
        }
      } else {
        // If count is less than the smallest multiple, use the smallest multiple's unit price
        const smallestOption = item.pricing.sort((a, b) => a.count - b.count)[0];
        const unitPrice = smallestOption.price / smallestOption.count;
        itemTotal = count * unitPrice;
      }

      return sum + itemTotal;
    }, 0);
  }, [selectedItems]);

  const handleProceedToCheckout = () => {
    if (!addressInfo.address || !addressInfo.zipcode || !addressInfo.city || !addressInfo.state) {
      alert("Please fill in all address details.");
      return;
    }
    if (Object.keys(selectedItems).length === 0) {
      alert("Please select at least one item.");
      return;
    }
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      alert("Please fill in all customer information fields.");
      return;
    }
    
    alert(`Shipped Order Summary:\nTotal Price: $${totalCost.toFixed(2)}\n(Stripe payment integration would go here)`);
    // setShowCheckout(true);
  };

  return (
    <div className="get-shipped">
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
            <p>Thank you for your shipped order. You will receive a confirmation email shortly.</p>
            <p>Total Paid: ${totalCost.toFixed(2)}</p>
          </div>
        ) : showCheckout ? (
          <div className="checkout-section">
            {/* Checkout form JSX removed for stability */}
          </div>
        ) : (
          <>
            <div className="delivery-hero">
              <h1 className="delivery-title">GET SHIPPED</h1>
              <p className="delivery-subtitle">Fresh, raw vegan meals shipped directly to your door</p>
            </div>

            {/* Address Form Section */}
            <div className="selection-section">
              <h2>Shipping Address:</h2>
              <div className="address-form-grid">
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={addressInfo.address}
                  onChange={handleAddressChange}
                  required
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={addressInfo.city}
                  onChange={handleAddressChange}
                  required
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={addressInfo.state}
                  onChange={handleAddressChange}
                  required
                />
                <input
                  type="text"
                  name="zipcode"
                  placeholder="Zipcode"
                  value={addressInfo.zipcode}
                  onChange={handleAddressChange}
                  required
                />
              </div>
            </div>

            {/* Food Selection Section */}
            <div className="food-selection-section">
              <h2>Select Your Shipped Items</h2>
              <p className="selection-counter">
                Total Items: {Object.values(selectedItems).reduce((sum, sel) => sum + sel.count, 0)} | Total Cost: ${totalCost.toFixed(2)}
              </p>
              <div className="food-grid">
                {shippedItems.map(item => (
                  <div key={item.id} className="food-card">
                    <img src={item.image} alt={item.name} />
                    <h3>{item.name}</h3>
                    <p className="food-description">{item.description}</p>
                    <p className="food-price">
                        {item.pricing.map(p => `${p.count} for $${p.price.toFixed(2)}`).join(' | ')}
                    </p>
                    <div className="item-controls">
                      <button onClick={() => handleItemChange(item.id, -1)} disabled={!selectedItems[item.id]}>-</button>
                      <span>{selectedItems[item.id]?.count || 0}</span>
                      <button onClick={() => handleItemChange(item.id, 1)}>+</button>
                    </div>
                    <p className="multiples-info">Order in multiples of {item.multiples}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Info Section */}
            <div className="customer-info-section">
              <h2>Customer Information & Checkout</h2>
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
          </>
        )}
      </main>
    </div>
  );
};

export default GetShipped;
