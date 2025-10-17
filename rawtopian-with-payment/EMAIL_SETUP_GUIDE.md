# Email Notification Setup Guide

## Overview
This guide will help you set up email notifications for orders placed through the "Get Delivered" page.

## Option 1: Using SendGrid (Recommended - Free Tier Available)

### Step 1: Create SendGrid Account
1. Go to https://sendgrid.com/
2. Sign up for a free account (allows 100 emails/day)
3. Verify your email address

### Step 2: Create API Key
1. Log in to SendGrid dashboard
2. Go to Settings → API Keys
3. Click "Create API Key"
4. Give it a name (e.g., "Rawtopian Bliss Orders")
5. Select "Full Access"
6. Click "Create & View"
7. **Copy the API key** (you won't be able to see it again!)

### Step 3: Install SendGrid Package
```bash
cd rawtopian-bliss-website
pnpm add @sendgrid/mail
```

### Step 4: Update the Email Function
Edit `api/send-order-email.js` and uncomment the SendGrid code:

```javascript
import sgMail from '@sendgrid/mail';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const orderData = req.body;
    
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const emailContent = `
      New Order Received - Rawtopian Bliss
      
      Order Details:
      --------------
      Location: ${orderData.location}
      Package: ${orderData.package} - $${orderData.price}
      
      Customer Information:
      ---------------------
      Name: ${orderData.customerName}
      Email: ${orderData.customerEmail}
      Phone: ${orderData.customerPhone}
      Delivery Address: ${orderData.customerAddress}
      
      Selected Items:
      ---------------
      ${orderData.items.map(item => `${item.name} x ${item.quantity}`).join('\n      ')}
      
      ${orderData.comments ? `Comments/Questions:\n${orderData.comments}` : ''}
      
      Total: $${orderData.price}
    `;

    await sgMail.send({
      to: process.env.OWNER_EMAIL,
      from: process.env.SENDER_EMAIL, // Must be verified in SendGrid
      subject: `New Order - ${orderData.package} - ${orderData.customerName}`,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>')
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Order received successfully' 
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Failed to process order',
      details: error.message 
    });
  }
}
```

### Step 5: Set Environment Variables in Netlify
1. Go to your Netlify dashboard
2. Select your Rawtopian Bliss site
3. Go to Site Settings → Environment Variables
4. Add these variables:
   - `SENDGRID_API_KEY`: Your SendGrid API key
   - `OWNER_EMAIL`: Your email address (where orders will be sent)
   - `SENDER_EMAIL`: Verified sender email in SendGrid

### Step 6: Verify Sender Email in SendGrid
1. Go to SendGrid → Settings → Sender Authentication
2. Click "Verify a Single Sender"
3. Fill in your details
4. Check your email and click the verification link
5. Use this verified email as `SENDER_EMAIL`

## Option 2: Using Formspree (Easiest - No Code Required)

### Step 1: Create Formspree Account
1. Go to https://formspree.io/
2. Sign up for free account (50 submissions/month)
3. Create a new form
4. Get your form endpoint URL

### Step 2: Update GetDelivered.jsx
Replace the `handleSubmitOrder` function:

```javascript
const handleSubmitOrder = async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  formData.append('location', selectedLocation);
  formData.append('package', selectedPackage);
  formData.append('price', getPrice());
  formData.append('items', JSON.stringify(
    foodItems
      .filter(item => selectedItems[item.id] > 0)
      .map(item => ({
        name: item.name,
        quantity: selectedItems[item.id]
      }))
  ));
  formData.append('comments', comments);

  try {
    const response = await fetch('YOUR_FORMSPREE_ENDPOINT', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      alert('Order placed successfully! You will receive a confirmation email shortly.');
      window.location.href = '/';
    } else {
      alert('There was an error submitting your order. Please try again.');
    }
  } catch (error) {
    alert('There was an error submitting your order. Please try again.');
  }
};
```

## Option 3: Using Netlify Forms (Built-in, Free)

### Step 1: Update GetDelivered.jsx
Add `netlify` attribute to the form and a hidden input:

```javascript
<form onSubmit={handleSubmitOrder} name="order-form" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="order-form" />
  
  {/* Rest of your form fields */}
</form>
```

### Step 2: Configure Netlify Form Notifications
1. Go to Netlify dashboard
2. Select your site
3. Go to Forms → Form notifications
4. Add email notification
5. Enter your email address

## Payment Integration

To accept actual payments, you'll need to integrate a payment processor:

### Stripe Integration (Recommended)

1. **Create Stripe Account**
   - Go to https://stripe.com/
   - Sign up for account
   - Get your API keys

2. **Install Stripe**
   ```bash
   pnpm add @stripe/stripe-js
   ```

3. **Update GetDelivered.jsx**
   ```javascript
   import { loadStripe } from '@stripe/stripe-js';
   
   const stripePromise = loadStripe('YOUR_PUBLISHABLE_KEY');
   
   const handleCheckout = async () => {
     const stripe = await stripePromise;
     
     // Create checkout session via your backend
     const response = await fetch('/api/create-checkout-session', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         items: selectedItems,
         package: selectedPackage,
         price: getPrice()
       })
     });
     
     const session = await response.json();
     
     // Redirect to Stripe Checkout
     const result = await stripe.redirectToCheckout({
       sessionId: session.id
     });
   };
   ```

## Testing

Before going live:

1. **Test Email Delivery**
   - Place a test order
   - Check if email arrives
   - Verify all information is correct

2. **Test Payment Processing**
   - Use Stripe test cards
   - Verify payment flow
   - Check confirmation emails

3. **Test on Mobile**
   - Verify form works on mobile devices
   - Check all fields are accessible
   - Test checkout process

## What Email You'll Receive

When a customer places an order, you'll receive an email with:

- Customer name, email, phone
- Delivery address
- Selected location (Charlotte, Rock Hill, or Columbia)
- Package type (Pick 6 or Pick 12)
- List of all selected food items with quantities
- Any comments or questions from the customer
- Total price

## Troubleshooting

### Emails Not Sending
- Check environment variables are set correctly in Netlify
- Verify SendGrid API key is valid
- Check sender email is verified in SendGrid
- Look at Netlify function logs for errors

### Form Not Submitting
- Check browser console for JavaScript errors
- Verify API endpoint is correct
- Check network tab in browser dev tools

### Payment Not Processing
- Verify Stripe keys are correct
- Check Stripe dashboard for failed payments
- Review Stripe webhook logs

## Next Steps

1. Choose your email service (SendGrid recommended)
2. Set up payment processing (Stripe recommended)
3. Test thoroughly before launching
4. Monitor orders and emails regularly

## Support

If you need help:
- SendGrid: https://sendgrid.com/docs/
- Stripe: https://stripe.com/docs
- Netlify Forms: https://docs.netlify.com/forms/setup/

