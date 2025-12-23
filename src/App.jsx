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
  { id: 1, name: "Rainbow Salad", description: "This colorful medley of raw power and great taste is 95% Raw with 2oz of cooked Quinoa for added protein and that 'cooked food texture' all presented on a bed of organic Spring Mix.  A rainbow of plantbased color, enzyme rich, great tasting, and complemented with a 2oz tub of Jalapeño crisps and a Golden Goddess dressing.", image: Food1 },
  { id: 2, name: "Mock Chiken Salad Wrap", description: "Our Mock Chiken Salad is made from fresh Parsnips with added veggies, herbs and spices.  Its 100% Raw and seasoned to perfection, wrapped in a habinero lime tortilla shell, on a bed of Spring Mix, sliced Tomatoes and Alfalfa Sprouts.  This wrap comes with a 2oz tub of Sunseed Cheeze and GF Sweet Chili Rice Crackers.", image: Food2 },
  { id: 3, name: "Crabcakes", description: "One of our brand's most favorites is our plant based crab cakes, which are made from carrots with added sea veggies, herbs and spices and are 100% Raw.  This meal comes with 2 Crab Cakes, our in-house made Tartar sauce, fresh salad greens, black beans over quinoa and our vegan MacnCheeze.", image: Food3 },
  { id: 4, name: "Seafood Celebration", description: "Another brand favorite, our seafood celebration meal comes with our plantbased seafood patty made from carrots, sea veggies, herbs and spices: our in-house TarTar sauce, over fresh salad greens, with Black Beans over Quinoa and lightly steamed veggies.", image: Food4 },
  { id: 5, name: "Carolina Black Bean Burger With Side Salad", description: "This burger is to LIVE FOR!!!  Our hand pattied Black Bean burger meal is 80% Raw.  Wrapped in a vegan Brioche bun, or a Lettuce bun with grilled Onion, Green Pepper, and Vegan Cheeze.  Accompanied by our fully loaded garden salad and Golden Goddess dressing.", image: Food5 },
  { id: 6, name: "Stuffed Peppers", description: "We stuffed (2) Bell peppers with Quinoa, Sweet Peas, our Plantbased Meaty mix, Broccoli, Onions, herbs and Spices.  Savory and satisfying, these stuffed peppers come with a loaded Salad and Sweet Balsamic dressing.", image: Food6 },
  { id: 7, name: "7-Layer Lasagna", description: "This 7-Layer tower of Goodness is 90% Raw with one layer of lightly steamed veggies to give that cooked food texture to this largely live, bold flavored lasagna.  Packed with flavor and enzyme rich.  Served with a Side Salad and (3) Humus Rolls.", image: Food7 },
  { id: 8, name: "Personal Pan Pizza", description: "The Star of Rawtopian Bliss has always been our Personal Pan Pizza!!!  This Raw Blissful Creation is 2 Habinero Lime Tortilla Shells with our Sunseed Cheeze sandwiched in the middle, topped with fresh made Marinara Sauce, fresh Avocado, Peppers, Onions, Kalamata Relish and fresh Herbs and Spices. Cuts into 8 easy to eat, easy to share slices.  Very filling and packed with an abundance of fresh flavor.", image: Food8 },
  { id: 9, name: "Taco Bliss Bowl", description: "This dish is like Mexican Food Heaven!!!  A bed of Organic Spring Mix over a layer of Sweet Chili Rice Crackers, topped with 2oz Quinoa, 4oz of our Meaty Mix, Pico deGallo, Sunseed Cheeze and our Golden Goddess dressing.  Enjoying is the only option.", image: Food9 },
  { id: 10, name: "Sushi Roll Platter", description: "Assortment of vegetable and nut-based sushi rolls.", image: Food10 },
  { id: 11, name: "Raw Vegan Pizza", description: "Large raw crust pizza with a variety of fresh toppings.", image: Food11 },
  { id: 12, name: "Avocado Sushi Roll", description: "Simple and creamy avocado sushi rolls.", image: Food12 },
];

const Home = () => (
  <div className="App">
    {/* Header */}
    <header className="App-header">
      <nav className="horizontal-nav">
        <div className="nav-links-desktop"> {/* <-- NEW WRAPPER */}
          <a href="#menu" className="nav-link">MENU</a>
          <a href="#about" className="nav-link">ABOUT</a>
        </div>
        <img src={RawtopianTransparentLogo} alt="Rawtopian Bliss Logo" className="center-logo" />
<div className="nav-links-desktop">
  <a href="#classes" className="nav-link">CHEF CLASSES</a>
  <a href="#contact" className="nav-link">CONTACT</a>
</div>
</nav>

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
    
     {/* About Section - New Full-Width Banner */}
<section className="about-header-container">
  <h2 className="section-header-green centered-header">About The Chef</h2>
</section>
<section id="about" className="chef-banner-section">
  <img src={SaaBanner} alt="Chef Saa Shalom Banner" className="chef-banner-image" />
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
        <span className="payment-logo applepay"></span>
      </div>
      <p className="copyright">&copy; {new Date( ).getFullYear()} Rawtopian Bliss. All rights reserved.</p>
    </footer>
  </div> // Closes the main <div className="App">
) // Closes the return statement
}; // Closes the const Home = () => {


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
