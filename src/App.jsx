import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import Assets - FIXED TO MATCH YOUR ACTUAL FILENAMES
import RawtopianTransparentLogo from './assets/RawtopianFinalLogotransparent.png';
import SaaShalom from './assets/SaaShalom.JPG';
import SaaBanner from './assets/SaaBanner.png';
import FoodItem1 from './assets/Food1.JPG';
import FoodItem2 from './assets/Food2.JPG';
import FoodItem3 from './assets/Food3.JPG';
import FoodItem4 from './assets/Food4.JPG';
import FoodItem5 from './assets/Food5.JPG';
import FoodItem6 from './assets/Food6.JPG';

// Import Components
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

const Home = () => {
  return (
    <div className="home-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-links-desktop">
          <a href="#menu">MENU</a>
          <a href="#about">ABOUT</a>
        </div>
        <div className="logo-container">
          <img src={RawtopianTransparentLogo} alt="Rawtopian Bliss Logo" className="nav-logo" />
        </div>
        <div className="nav-links-desktop">
          <a href="#newsletter">NEWSLETTER</a>
          <a href="#contact">CONTACT</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h1>RAWTOPIAN BLISS</h1>
          <p>Experience the vibrant flavors of raw vegan cuisine.</p>
          <div className="hero-buttons">
            <Link to="/get-delivered" className="btn btn-primary">GET DELIVERED</Link>
            <Link to="/get-shipped" className="btn btn-secondary">GET SHIPPED</Link>
          </div>
        </div>
      </header>

      {/* Menu Section */}
      <section id="menu" className="menu-section">
        <h2>OUR MENU</h2>
        <div className="menu-grid">
          {menuItems.map((item) => (
            <div key={item.id} className="menu-item">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span className="price">${item.price}</span>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2>ABOUT THE CHEF</h2>
            <p>Chef Saa Shalom is dedicated to bringing you the finest raw vegan meals, prepared with love and the freshest organic ingredients.</p>
          </div>
          <div className="about-image">
            <img src={SaaShalom} alt="Chef Saa Shalom" />
          </div>
        </div>
      </section>

      {/* Chef Banner */}
      <div className="chef-banner">
        <img src={SaaBanner} alt="Chef Banner" />
      </div>

      {/* Newsletter Section */}
      <section id="newsletter" className="newsletter-section">
        <h2>JOIN OUR NEWSLETTER</h2>
        <p>Stay updated with our latest recipes and offers.</p>
        <form className="newsletter-form">
          <input type="email" placeholder="Enter your email" required />
          <button type="submit" className="btn btn-primary">SUBSCRIBE</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <img src={RawtopianTransparentLogo} alt="Logo" className="footer-logo" />
          <div className="social-links">
            <a href="https://www.instagram.com/rawtopianbliss/" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://www.facebook.com/saa.bey.52/" target="_blank" rel="noreferrer">Facebook</a>
          </div>
          <p>&copy; {new Date( ).getFullYear()} Rawtopian Bliss. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/get-delivered" element={<GetDelivered />} />
        <Route path="/get-shipped" element={<GetShipped />} />
      </Routes>
    </Router>
  );
}

export default App;
