import React from 'react';
import { Routes, Route } from 'react-router-dom';
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

import GetDelivered from './GetDelivered';
import GetShipped from './GetShipped';

function HomePage() {
  const foodItems = [
    {
      id: 1,
      name: "Rainbow Salad",
      image: Food1,
      description: "This colorful medley of raw power and great taste is 95% Raw with 2oz of cooked Quinoa for added protein and that 'cooked food texture' all presented on a bed of organic Spring Mix. A rainbow of plantbased color, enzyme rich, great tasting, and complemented with a 2oz tub of Jalapeño crisps and a Golden Goddess dressing."
    },
    {
      id: 2,
      name: "Mock Chiken Salad Wrap",
      image: Food2,
      description: "Our Mock Chiken Salad is made from fresh parsnips with added veggies, herbs and spices. Its 100% Raw and seasoned to perfection, wrapped in a habinero lime tortilla shell, on a bed of Spring Mix, sliced Tomatoes and Alfalfa Sprouts.  This wrap comes with a 2oz tub of Sunseed Cheeze and GF Sweet Chili Rice Crackers."
    },
    {
      id: 3,
      name: "Crabcakes",
      image: Food3,
      description: "One of our brand's most favorites is our plant based crab cakes, which are made from carrots with added sea veggies, herbs and spices and are 100% Raw.  This meal comes with 2 Crab Cakes, our in-house made Tartar sauce, fresh salad greens, black beans over quinoa and our vegan MacnCheeze."
    },
    {
      id: 4,
      name: "Seafood Celebration",
      image: Food4,
      description: "Another brand favorite, our seafood celebration meal comes with our plantbased seafood patty made from carrots, sea veggies, herbs and spices: our in-house TarTar sauce, over fresh salad greens, with Black Beans over Quinoa and lightly steamed veggies."
    },
    {
      id: 5,
      name: "Carolina Black Bean Burger With Side Salad",
      image: Food5,
      description: "This burger is to LIVE FOR!!!  Our hand pattied Black Bean burger meal is 80% Raw.  Wrapped in a vegan Brioche bun, or a Lettuce bun with grilled Onion, Green Pepper, and Vegan Cheeze.  Accompanied by our fully loaded garden salad and Golden Goddess dressing."
    },
    {
      id: 6,
      name: "Stuffed Peppers",
      image: Food6,
      description: "We stuffed (2) Bell peppers with Quinoa, Sweet Peas, our Plantbased Meaty mix, Broccoli, Onions, herbs and Spices.  Savory and satisfying, these stuffed peppers come with a loaded Salad and Sweet Balsamic dressing."
    },
    {
      id: 7,
      name: "7-Layer Lasagna",
      image: Food7,
      description: "This 7-Layer tower of Goodness is 90% Raw with one layer of lightly steamed veggies to give that cooked food texture to this largely live, bold flavored lasagna.  Packed with flavor and enzyme rich.  Served with a Side Salad and (3) Humus Rolls."
    },
    {
      id: 8,
      name: "Personal Pan Pizza",
      image: Food8,
      description: "The Star of Rawtopian Bliss has always been our Personal Pan Pizza!!!  This Raw Blissful Creation is 2 Habinero Lime Tortilla Shells with our Sunseed Cheeze sandwiched in the middle, topped with fresh made Marinara Sauce, fresh Avocado, Peppers, Onions, Kalamata Relish and fresh Herbs and Spices.  Cuts into 8 easy to eat, easy to share slices.  Very filling and packed with an abundance of fresh flavor."
    },
    {
      id: 9,
      name: "Taco Bliss Bowl",
      image: Food9,
      description: "This dish is like Mexican Food Heaven!!!  A bed of Organic Spring Mix over a layer of Sweet Chili Rice Crackers, topped with 2oz Quinoa, 4oz of our Meaty Mix, Pico deGallo, Sunseed Cheeze and our Golden Goddess dressing.  Enjoying is the only option."
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
          <a href="/#menu" className="nav-link">MENU</a>
          <a href="/#about" className="nav-link">ABOUT</a>
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
            <h1 className="main-tagline">DO YOU LIKE IT RAW?</h1>
            <h2>80% Raw Vegan • 100% Delicious</h2>
            <p>Experience the sensual side of healthy living</p>
            <div className="hero-buttons">
              <a href="/get-delivered" className="hero-button primary">Get Delivered</a>
              <a href="/get-shipped" className="hero-button secondary">Get Shipped</a>
            </div>
          </div>
        </div>
      </section>



      {/* Food Showcase Section */}
      <section id="menu" className="food-showcase">
        <h2>Pick Your Meal Plan Item</h2>
        <p className="food-showcase-subtitle">Indulge in nature's finest creations</p>
        
        <div className="food-grid">
          {foodItems.map((item) => (
            <div key={item.id} className="food-item">
              <img src={item.image} alt={item.name} />
              <div className="food-item-info">
                <h3 className="food-item-title">{item.name}</h3>
                <p className="food-item-description">{item.description}</p>
                <a href="/get-delivered" className="order-button">Order Now</a>
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/get-delivered" element={<GetDelivered />} />
      <Route path="/get-shipped" element={<GetShipped />} />
    </Routes>
  );
}

export default App;

