import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './OrderSuccess.css';
import RawtopianTransparentLogo from './assets/RawtopianFinalLogotransparent.png';
import CashAppQR from './assets/cashapp_qr.jpg';

const OrderSuccess = () => {
  const location = useLocation();
  const [orderData, setOrderData] = useState(null);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    // Try to get order data from location state or localStorage
    const savedData = location.state || JSON.parse(localStorage.getItem('lastOrder') || 'null');
    if (savedData) {
      setOrderData(savedData);
      // Generate a unique Order ID if not present
      const id = savedData.orderId || Math.random().toString(36).substr(2, 9).toUpperCase();
      setOrderId(id);
    }
  }, [location]);

  const handleCashAppClick = () => {
    // Open Cash App with the $Cashtag and pre-filled note
    const note = encodeURIComponent(`Order ID: ${orderId} - ${orderData?.name || ''}`);
    window.location.href = `https://cash.app/$VeganLife007?note=${note}`;
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  if (!orderData) {
    return (
      <div className="order-success-container">
        <header className="App-header">
          <nav className="horizontal-nav">
            <Link to="/" className="nav-link">HOME</Link>
            <img src={RawtopianTransparentLogo} alt="Rawtopian Bliss Logo" className="center-logo" />
            <Link to="/#contact" className="nav-link">CONTACT</Link>
          </nav>
        </header>
        <div className="order-error">
          <h2>No Order Found</h2>
          <p>We couldn't find your recent order details. If you just placed an order, please check your email for confirmation.</p>
          <Link to="/" className="return-home-button">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="order-success-container">
      <header className="App-header">
        <nav className="horizontal-nav">
          <Link to="/" className="nav-link">HOME</Link>
          <img src={RawtopianTransparentLogo} alt="Rawtopian Bliss Logo" className="center-logo" />
          <Link to="/#contact" className="nav-link">CONTACT</Link>
        </nav>
      </header>

      <main className="success-content">
        <div className="success-header">
          <div className="success-icon">✅</div>
          <h1>Order Submitted Successfully!</h1>
          <p>Thank you for choosing Rawtopian Bliss, <strong>{orderData.name}</strong>!</p>
        </div>

        <div className="receipt-card">
          <div className="receipt-header">
            <h3>Order Receipt</h3>
            <span className="order-id-badge">ID: {orderId}</span>
          </div>
          
          <div className="receipt-body">
            <div className="receipt-row">
              <span>Date:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
            <div className="receipt-row">
              <span>Location:</span>
              <span>{orderData.location || 'Shipping'}</span>
            </div>
            <div className="receipt-row">
              <span>Package:</span>
              <span>{orderData.package}</span>
            </div>
            <div className="receipt-items">
              <p><strong>Items:</strong></p>
              <p>{orderData.items}</p>
            </div>
            <div className="receipt-total">
              <span>Total Amount:</span>
              <span>${orderData.total}</span>
            </div>
          </div>
          
          <div className="receipt-footer">
            <p>A copy of this order has been sent to Chef Saa.</p>
            <button onClick={handlePrintReceipt} className="print-button">
              🖨️ Print Receipt
            </button>
          </div>
        </div>

        <div className="payment-instructions-card">
          <h3>Final Step: Complete Your Payment</h3>
          <p>Your order is pending until payment is received via Cash App.</p>
          
          <div className="payment-highlight">
            <p>Send <strong>${orderData.total}</strong> to:</p>
            <h2 className="cashtag">$VeganLife007</h2>
            <p className="note-instruction">⚠️ IMPORTANT: Include <strong>Order ID: {orderId}</strong> in the payment note.</p>
          </div>

          <div className="payment-actions">
            <button onClick={handleCashAppClick} className="cashapp-pay-button">
              💰 Pay with Cash App
            </button>
          </div>

          <div className="qr-section">
            <p>Or scan to pay on your mobile device:</p>
            <img src={CashAppQR} alt="Cash App QR Code" className="qr-code-large" />
          </div>
        </div>

        <Link to="/" className="finish-button">Back to Home</Link>
      </main>
    </div>
  );
};

export default OrderSuccess;
