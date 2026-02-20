import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import Assets
import RawtopianTransparentLogo from './assets/RawtopianTransparentLogo.png';
import SaaShalom from './assets/SaaShalom.JPG';
import SaaBanner from './assets/SaaBanner.png'; // <-- ADDED
import FoodItem1 from './assets/FoodItem1.png';
import FoodItem2 from './assets/FoodItem2.png';
import FoodItem3 from './assets/FoodItem3.png';
import FoodItem4 from './assets/FoodItem4.png';
import FoodItem5 from './assets/FoodItem5.png';
import FoodItem6 from './assets/FoodItem6.png';

// Import Components (Assuming these exist or will be created)
import GetDelivered from './GetDelivered';
import GetShipped from './GetShipped';

// Data for Menu Items
const menuItems = [
  { id: 1, name: 'Raw Pizza', description: 'A delicious, guilt-free raw pizza with cashew cheese and fresh veggies.', price: '15.00', image: FoodItem1 },
  { id: 2, name: 'Zucchini Pasta', description: 'Spiralized zucchini noodles tossed in a creamy avocado pesto sauce.', price: '14.00', image: FoodItem2 },
  { id: 3, name: 'Taco Salad', description: 'A vibrant salad with walnut meat, pico de gallo, and a spicy dressing.', price: '13.00', image: FoodItem3 },
  { id: 4, name: 'Key Lime Pie', description: 'A tangy and sweet raw key lime pie with a pecan crust.', price: '8.00', image: FoodItem4 },
  { id: 5, name: 'Green Smoothie', description: 'A powerful blend of spinach, kale, banana, and superfoods.', price: '9.00', image: FoodItem5 },
  { id: 6, name: 'Raw Burger', description: 'A hearty veggie patty on a lettuce bun with all the fixings.', price: '16.00', image: FoodItem6 },
];

// Home Component
const Home = () => {
  return (
    <div className="App">
      {/* Header */}
      <header className="App-header">
        <nav className="horizontal-nav">
          <div className="nav-links-desktop">
            <a href="#menu" className="nav-link">MENU</a>
            <a href="#about" className="nav-link">ABOUT</a>
          </div>
          <img src={RawtopianTransparentLogo} alt="Rawtopian Bliss Logo" className="center-logo" />
          <div className="nav-links-desktop">
            <a href="#classes" className="nav-link">CHEF CLASSES</a>
            <a href="#contact" className="nav-link">CONTACT</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-headline">Do You Like It Raw?</h1>
          <p className="hero-subtitle">Rawtopian Bliss is a raw, vegan meal prep service that delivers fresh, delicious, and nutrient-dense food right to your door.</p>
          <div className="hero-buttons">
            <Link to="/get-delivered" className="hero-button delivered-button">GET DELIVERED</Link>
            <Link to="/get-shipped" className="hero-button shipped-button">GET SHIPPED</Link>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="menu-section">
        <h2 className="section-header-green">A La Carte</h2>
        <p className="section-subtitle">Choose from our selection of fresh, handcrafted raw vegan meals.</p>
        <div className="food-grid">
          {menuItems.map(item => (
            <div key={item.id} className="food-item">
              <img src={item.image} alt={item.name} className="food-item-image" />
              <div className="food-item-info">
                <h3 className="food-item-name">{item.name}</h3>
                <p className="food-item-description">{item.description}</p>
                <p className="food-item-price">${item.price}</p>
                <button className="order-now-button">ORDER NOW</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section Header */}
      {/* About Section - New Full-Width Banner */}
      <section className="about-header-container">
        <h2 className="section-header-green centered-header">About The Chef</h2>
      </section>
      <section id="about" className="chef-banner-section">
        <img src={SaaBanner} alt="Chef Saa Shalom Banner" className="chef-banner-image" />
      </section>

      {/* Newsletter Section - MOVED HERE */}
      <section id="newsletter" className="newsletter-section">
        <h2 className="section-header-green">Stay In Touch</h2>
        <p className="newsletter-subtitle">Join our mailing list for sales, discounts and giveaways</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Your@email.com" required className="newsletter-input" />
          <button type="submit" className="subscribe-button">SUBSCRIBE</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="App-footer">
        <div className="footer-links">
          <Link to="/about-us">ABOUT US</Link>
          <Link to="/contact-us">CONTACT US</Link>
          <Link to="/faqs">FAQ'S</Link>
          <Link to="/privacy-policy">PRIVACY POLICY</Link>
          <Link to="/terms-conditions">TERMS & CONDITIONS</Link>
          <Link to="/terms-of-service">TERMS OF SERVICE</Link>
          <Link to="/refund-policy">REFUND POLICY</Link>
          <Link to="/do-not-sell">DO NOT SELL MY PERSONAL INFORMATION</Link>
        </div>

        {/* Rawtopian Bliss Logo in the middle */}
        <img src={RawtopianTransparentLogo} alt="Rawtopian Bliss Logo" className="footer-logo" />

        <div className="social-icons">
          {/* Social Icons with your actual URLs */}
          <a href="https://www.instagram.com/rawtopianbliss/" target="_blank" rel="noopener noreferrer" className="social-icon instagram"></a>
          <a href="https://www.facebook.com/saa.bey.52/" target="_blank" rel="noopener noreferrer" className="social-icon facebook"></a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon youtube"></a> {/* YouTube Placeholder */}
        </div>

        <div className="payment-logos">
          {/* Payment Logos - These will be styled with CSS background images */}
          <span className="payment-logo visa"></span>
          <span className="payment-logo mastercard"></span>
          <span className="payment-logo discover"></span>
          <span className="payment-logo amex"></span>
          <span className="payment-logo paypal"></span>
          <span className="payment-logo applepay"></span>
        </div>
        <p className="copyright">&copy; {new Date( ).getFullYear()} Rawtopian Bliss. All rights reserved.</p>
      </footer>
    </div>
  );
};

// App Component (Router)
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-delivered" element={<GetDelivered />} />
        <Route path="/get-shipped" element={<GetShipped />} /> {/* ADDED ROUTE */}
      </Routes>
    </Router>
  );
}

export default App;
