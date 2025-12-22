import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import GetDelivered from './GetDelivered';
import GetShipped from './GetShipped'; 
import './App.css'; 

// CORRECTED IMPORTS based on your repository screenshot:
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

// CRITICAL FIX: Corrected to use .png (lowercase) extension
import RawtopianFinalLogo from './assets/RawtopianFinalLogo.png'; 
import RawtopianTransparentLogo from './assets/RawtopianFinalLogotransparent.png'; 
import SaaShalom from './assets/SaaShalom.JPG';
import SaaBanner from './assets/SaaBanner.png'; // <-- ADD THIS LINE


const foodItems = [
  { id: 1, name: "Rainbow Salad", description: "A vibrant mix of fresh, raw vegetables and a light vinaigrette.", image: Food1 },
  { id: 2, name: "Mock Chiken Salad Wrap", description: "Savory chickpea-based 'chicken' salad wrapped in a collard green leaf.", image: Food2 },
  { id: 3, name: "Crabcakes", description: "Delicious hearts of palm and artichoke 'crabcakes' with a spicy remoulade.", image: Food3 },
  { id: 4, name: "Seafood Celebration", description: "A mix of marinated vegetables and seaweeds that taste like the ocean.", image: Food4 },
  { id: 5, name: "Carolina Black Bean Burger With Side Salad", description: "A hearty black bean patty served with a side salad.", image: Food5 },
  { id: 6, name: "Stuffed Peppers", description: "Bell peppers stuffed with a savory nut and seed filling.", image: Food6 },
  { id: 7, name: "7-Layer Lasagna", description: "Layers of zucchini, cashew cheese, and sun-dried tomato marinara.", image: Food7 },
  { id: 8, name: "Personal Pan Pizza", description: "A small, raw crust topped with fresh vegetables and nut cheese.", image: Food8 },
  { id: 9, name: "Taco Bliss Bowl", description: "A bowl of seasoned walnut 'meat', salsa, and avocado on a bed of greens.", image: Food9 },
  { id: 10, name: "Sushi Roll Platter", description: "Assortment of vegetable and nut-based sushi rolls.", image: Food10 },
  { id: 11, name: "Raw Vegan Pizza", description: "Large raw crust pizza with a variety of fresh toppings.", image: Food11 },
  { id: 12, name: "Avocado Sushi Roll", description: "Simple and creamy avocado sushi rolls.", image: Food12 },
];

const Home = () => (
  <div className="App">
    {/* Header */}
    <header className="App-header">
      <nav className="horizontal-nav">
        <a href="#menu" className="nav-link">MENU</a>
        <a href="#about" className="nav-link">ABOUT</a>
        <img src={RawtopianTransparentLogo} alt="Rawtopian Bliss Logo" className="center-logo" />
        <a href="#classes" className="nav-link">CHEF CLASSES</a>
        <a href="#contact" className="nav-link">CONTACT</a>
      </nav>
    </header>

    {/* Hero Section - Full-Screen Video Embed and Buttons */}
    <section className="hero-section">
      {/* Video Background Layer (z-index: 1) */}
      <div className="video-background">
        <iframe 
          className="background-video" // Class name from your CSS
          src="https://www.youtube.com/embed/Ek-0_z1WGDM?autoplay=1&mute=1&loop=1&playlist=Ek-0_z1WGDM" 
          title="YouTube video player" 
          frameBorder="0" 
          allow="accelerometer; autoplay; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowFullScreen
        ></iframe>
        <div className="video-overlay"></div> {/* Added overlay as defined in your CSS */}
      </div>
      
      {/* Content Layer (z-index: 3 ) - ONLY BUTTONS REMAIN */}
      <div className="hero-content">
        {/* Restored Get Delivered/Get Shipped buttons on the homepage with CORRECT class names */}
        <div className="hero-content-wrapper">
        <h1 className="hero-headline">DO YOU LIKE IT RAW?</h1>
        <p className="hero-subtitle">
          100% Vegan, 80% Raw, Organic & Non-GMO, No Soy, Gluten-Free options
        </p>
        <div className="hero-buttons">
          <Link to="/get-delivered" className="hero-button primary">GET DELIVERED</Link>
          <Link to="/get-shipped" className="hero-button secondary">GET SHIPPED</Link>
        </div>
      </div>
      </div>
    </section>

    {/* Menu Section */}
    <section id="menu" className="menu-section">
      <h2 className="section-header-green">Order Your A La Carte Items Here</h2>

      <div className="food-grid">
        {foodItems.map((item) => (
          <div key={item.id} className="food-item">
            <img src={item.image} alt={item.name} />
            <div className="food-item-info">
              <h3 className="food-item-title">{item.name}</h3>
              <p className="food-item-description">{item.description}</p>
              {/* Confirmed Order Now button class for colored block style */}
              <Link to="/get-delivered" className="order-button">Order Now</Link>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Newsletter Section */}
  <section id="newsletter" className="newsletter-section">
     <h2 className="section-header-green">Stay In Touch</h2>
     <p className="newsletter-subtitle">Join our mailing list for sales, discounts and giveaways</p>
     <form className="newsletter-form">
       <input type="email" placeholder="Your@email.com" required className="newsletter-input" />
       <button type="submit" className="subscribe-button">SUBSCRIBE</button>
     </form>
   </section>
       {/* About Section - New Full-Width Banner */}
    <section id="about" className="chef-banner-section">
      <img src={SaaBanner} alt="Chef Saa Shalom Banner" className="chef-banner-image" />
    </section>


    {/* Contact Section */}
    <section id="contact" className="contact-section">
      <h2 className="section-title">Contact Us</h2>
      <p className="section-subtitle">We'd love to hear from you!</p>
      <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" rows="5" required></textarea>
        <button type="submit" className="submit-btn">Send Message</button>
      </form>
    </section>

    {/* Footer */}
    <footer className="App-footer">
      <img src={RawtopianTransparentLogo} alt="Rawtopian Bliss Logo" className="footer-logo" />
      <p>&copy; {new Date().getFullYear()} Rawtopian Bliss. All rights reserved.</p>
      <div className="social-links">
        {/* Add social media links here */}
      </div>
    </footer>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/get-delivered" element={<GetDelivered />} />
      <Route path="/get-shipped" element={<GetShipped />} /> {/* <-- ADDED ROUTE */}
    </Routes>
  );
}

export default App;
