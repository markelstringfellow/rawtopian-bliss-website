import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './GetDelivered.css';

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

const foodItems = [
  { id: 1, name: "Rainbow Salad", image: Food1 },
  { id: 2, name: "Mock Chicken Salad Wrap", image: Food2 },
  { id: 3, name: "Crabcakes", image: Food3 },
  { id: 4, name: "Seafood Celebration", image: Food4 },
  { id: 5, name: "Carolina Black Bean Burger", image: Food5 },
  { id: 6, name: "Stuffed Peppers", image: Food6 },
  { id: 7, name: "7-Layer Lasagna", image: Food7 },
  { id: 8, name: "Personal Pan Pizza", image: Food8 },
  { id: 9, name: "Taco Bliss Bowl", image: Food9 },
  { id: 10, name: "Sushi Roll Platter", image: Food10 },
  { id: 11, name: "Raw Vegan Pizza", image: Food11 },
  { id: 12, name: "Avocado Sushi Roll", image: Food12 },
];

const cities = [
  "Charleston",
  "North Charleston",
  "Mount Pleasant",
  "Summerville",
  "Goose Creek",
  "Moncks Corner",
];

const GetDelivered = () => {
  const [selectedPackage, setSelectedPackage] = useState('pick6');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [maxMeals, setMaxMeals] = useState(6);

  useEffect(() => {
    if (selectedPackage === 'pick6') {
      setMaxMeals(6);
      setTotalPrice(99);
    } else if (selectedPackage === 'pick12') {
      setMaxMeals(12);
      // Price updated to $175
      setTotalPrice(175); 
    }
    // Reset selected meals if the package changes and the current selection is too large
    if (selectedMeals.length > maxMeals) {
      setSelectedMeals(selectedMeals.slice(0, maxMeals));
    }
  }, [selectedPackage, maxMeals, selectedMeals.length]);

  const handleMealSelection = (mealId) => {
    setSelectedMeals(prevSelectedMeals => {
      const isSelected = prevSelectedMeals.includes(mealId);
      if (isSelected) {
        return prevSelectedMeals.filter(id => id !== mealId);
      } else if (prevSelectedMeals.length < maxMeals) {
        return [...prevSelectedMeals, mealId];
      }
      return prevSelectedMeals;
    });
  };

  const isMealSelected = (mealId) => selectedMeals.includes(mealId);
  const mealsRemaining = maxMeals - selectedMeals.length;
  const isSelectionComplete = mealsRemaining === 0;

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedCity) {
      alert("Please select a city for delivery.");
      return;
    }
    if (!isSelectionComplete) {
      alert(`Please select exactly ${maxMeals} meals.`);
      return;
    }
    // In a real app, this would initiate the Stripe payment process
    alert(`Order Summary:\nPackage: ${selectedPackage}\nCity: ${selectedCity}\nTotal Price: $${totalPrice}\nMeals: ${selectedMeals.map(id => foodItems.find(item => item.id === id).name).join(', ')}\n(Stripe payment integration would go here)`);
  };

  return (
    <div className="get-delivered-container">
      <header>
        <Link to="/" className="back-link">← Back to Menu</Link>
        <h1>Meal Plan Delivery</h1>
      </header>

      <div className="package-selection">
        <button 
          className={`package-btn ${selectedPackage === 'pick6' ? 'active' : ''}`}
          onClick={() => setSelectedPackage('pick6')}
        >
          Pick 6 Meals ($99)
        </button>
        <button 
          className={`package-btn ${selectedPackage === 'pick12' ? 'active' : ''}`}
          onClick={() => setSelectedPackage('pick12')}
        >
          Pick 12 Meals ($175)
        </button>
      </div>

      <form onSubmit={handleSubmit} className="delivery-form">
        <div className="form-group">
          <label htmlFor="city-select">Select Delivery City:</label>
          <select id="city-select" value={selectedCity} onChange={handleCityChange} required>
            <option value="" disabled>-- Select City --</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <h2>Select Your Meals ({selectedMeals.length}/{maxMeals})</h2>
        {selectedPackage !== 'alacarte' && (
          <p className="selection-status">
            {isSelectionComplete 
              ? "Selection Complete! Ready to Order." 
              : `Select ${mealsRemaining} more meal${mealsRemaining !== 1 ? 's' : ''}.`
            }
          </p>
        )}

        <div className="meal-grid">
          {foodItems.map(item => (
            <div 
              key={item.id} 
              className={`meal-item ${isMealSelected(item.id) ? 'selected' : ''} ${selectedMeals.length >= maxMeals && !isMealSelected(item.id) ? 'disabled' : ''}`}
              onClick={() => handleMealSelection(item.id)}
            >
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p className="price-tag">
                {selectedPackage === 'pick6' || selectedPackage === 'pick12' ? 'Included' : ''}
              </p>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <h3>Order Total: ${totalPrice.toFixed(2)}</h3>
          <button type="submit" disabled={!selectedCity || !isSelectionComplete}>
            Proceed to Checkout
          </button>
        </div>
      </form>
    </div>
  );
};

export default GetDelivered;
