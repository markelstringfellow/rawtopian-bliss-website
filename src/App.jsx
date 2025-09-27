import React from 'react';
import './App.css';
import RawtopianFinalLogo from './assets/RawtopianFinalLogo.png';
import RawtopianTransparentLogo from './assets/RawtopianFinalLogotransparent.png';

import SaaShalom from './assets/SaaShalom.JPG';
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

function App() {
  const foodItems = [
    {
      id: 1,
      name: "Raw Veggie Delight",
      image: Food1,
      description: "Fresh, vibrant vegetables bursting with natural flavors and nutrients. A perfect blend of health and taste."
    },
    {
      id: 2,
      name: "Garden Fresh Bowl",
      image: Food2,
      description: "A colorful medley of raw vegetables and greens, carefully crafted to nourish your body and soul."
    },
    {
      id: 3,
      name: "Rainbow Salad Supreme",
      image: Food3,
      description: "Experience the full spectrum of nature's bounty in this stunning raw creation."
    },
    {
      id: 4,
      name: "Raw Power Plate",
      image: Food4,
      description: "Energizing raw foods that will fuel your day with natural vitality and wellness."
    },
    {
      id: 5,
      name: "Nature's Bounty",
      image: Food5,
      description: "Pure, unprocessed ingredients combined to create a masterpiece of raw cuisine."
    },
    {
      id: 6,
      name: "Fresh & Raw Fusion",
      image: Food6,
      description: "A harmonious blend of textures and flavors that celebrate the beauty of raw food."
    },
    {
      id: 7,
      name: "Vibrant Veggie Mix",
      image: Food7,
      description: "Colorful vegetables that not only look amazing but taste incredible too."
    },
    {
      id: 8,
      name: "Raw Gourmet Special",
      image: Food8,
      description: "Elevated raw cuisine that proves healthy eating can be luxurious and satisfying."
    },
    {
      id: 9,
      name: "Garden to Table",
      image: Food9,
      description: "Fresh from nature to your plate, this dish embodies the essence of raw living."
    },
    {
      id: 10,
      name: "Raw Bliss Creation",
      image: Food10,
      description: "The ultimate expression of raw food artistry - beautiful, delicious, and nourishing."
    }
  ];

  return (
    <div className="App">
      {/* Header Section */}
      <header className="App-header">
        <nav className="horizontal-nav">
          <a href="#menu" className="nav-link">MENU</a>
          <a href="#about" className="nav-link">ABOUT</a>
          <img src={RawtopianTransparentLogo} alt="Rawtopian Bliss Logo" className="center-logo" />
          <a href="#classes" className="nav-link">CHEF CLASSES</a>
          <a href="#contact" className="nav-link">CONTACT</a>
        </nav>
      </header>

      {/* Hero Section with Video Background */}
      <section className="hero-section">
        <div className="video-background">
          <iframe
            src="https://www.youtube.com/embed/Ek-0_z1WGDM?autoplay=1&mute=1&loop=1&playlist=Ek-0_z1WGDM&controls=0&showinfo=0&rel=0&modestbranding=1"
            title="Background Video"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="background-video"
          ></iframe>
          <div className="video-overlay"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-bubbles">
              <div className="hero-bubble">
                <h2 style={{ color: "#FF6700" }}>DELIVER IT RAW</h2>
                <p style={{ color: "#222", fontWeight: "400" }}>
                  Fresh meal plans delivered within 2.5 hours of Lancaster, SC. Choose 6 or 12 meals per week.
                </p>
                <button className="hero-button primary">Get Delivered</button>
              </div>
              <div className="hero-bubble" style={{ marginTop: "40px" }}>
                <h2 style={{ color: "#FF6700" }}>SHIP IT RAW</h2>
                <p style={{ color: "#222", fontWeight: "400" }}>
                  Raw bulk items and specialty products shipped nationwide via mail.
                </p>
                <button className="hero-button secondary">Get Shipped</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Food Showcase Section */}
      <section id="menu" className="food-showcase">
        <h2>Our Rawtopian Delights</h2>
        <p className="section-subtitle">Indulge in nature's finest creations</p>
        
        <div className="food-grid">
          {foodItems.map((item) => (
            <div key={item.id} className="food-item">
              <img src={item.image} alt={item.name} />
              <div className="food-item-info">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <button className="order-button">Order Now</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-content">
          <div className="about-text">
            <h2>Meet Chef Saa Shalom</h2>
            <p>
              At Rawtopian Bliss, our goal is to make you enjoyable healthy meals. 
              We create foods that will flatter your taste buds while nurturing your body. 
              Whether you want something light or full, we have the best dishes for you!
            </p>
            <p>
              Our 80% raw vegan approach combines the sensual pleasure of eating with 
              the pure nutrition your body craves. Every dish is crafted with passion, 
              creativity, and a deep understanding of what makes food truly satisfying.
            </p>
          </div>
          <div className="about-image">
            <img src={SaaShalom} alt="Chef Saa Shalom" />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>Ready to Experience Raw Bliss?</h2>
        <div className="cta-buttons">
          <button className="cta-button primary">Order Now</button>
          <button className="cta-button secondary">Book Chef Classes</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <img src={RawtopianTransparentLogo} alt="Rawtopian Bliss Logo" className="footer-logo" />
          <p>&copy; 2024 Rawtopian Bliss. All rights reserved.</p>
          <div className="social-links">
            <a href="#" className="social-link">Instagram</a>
            <a href="#" className="social-link">Facebook</a>
            <a href="#" className="social-link">TikTok</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;