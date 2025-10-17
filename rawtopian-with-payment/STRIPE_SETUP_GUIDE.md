# Stripe Payment Setup Guide

## 🎯 Overview

Your "Get Delivered" page now includes complete Stripe payment integration! Customers can pay securely with credit cards, and you'll receive order notifications via email.

## ✅ What's Included

**Payment Features:**
- Secure credit card processing via Stripe
- Customer information form (name, email, phone, address)
- Real-time payment validation
- Order confirmation page
- Email notifications for each order
- PCI-compliant payment handling

**Customer Experience:**
1. Select location and package
2. Choose food items
3. Click "Proceed to Checkout"
4. Enter name, email, phone, address
5. Enter credit card information
6. Click "Pay $99" (or $149)
7. Receive confirmation

## 🚀 Setup Instructions

### Step 1: Create a Stripe Account

1. Go to https://stripe.com
2. Click "Start now" to create an account
3. Complete the registration process
4. Verify your email address

### Step 2: Get Your Stripe API Keys

1. Log in to https://dashboard.stripe.com
2. Click "Developers" in the left sidebar
3. Click "API keys"
4. You'll see two keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)
5. Copy both keys (you'll need them in Step 3)

**Important:** Start with TEST keys for testing. Switch to LIVE keys when ready to accept real payments.

### Step 3: Configure Environment Variables in Netlify

1. Go to your Netlify dashboard
2. Select your site (rawtopianbliss)
3. Go to "Site settings" → "Environment variables"
4. Click "Add a variable" and add these:

**Required for Stripe:**
```
VITE_STRIPE_PUBLISHABLE_KEY = pk_test_your_key_here
STRIPE_SECRET_KEY = sk_test_your_key_here
```

**Optional for Email Notifications:**
```
SENDGRID_API_KEY = your_sendgrid_key_here
SENDGRID_FROM_EMAIL = noreply@rawtopianbliss.org
ORDER_EMAIL = your-email@example.com
```

5. Click "Save"
6. Redeploy your site for changes to take effect

### Step 4: Test with Stripe Test Cards

Use these test card numbers (they won't charge real money):

**Successful Payment:**
- Card: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., 12/25)
- CVC: Any 3 digits (e.g., 123)
- ZIP: Any 5 digits (e.g., 12345)

**Declined Payment:**
- Card: `4000 0000 0000 0002`
- Use to test error handling

**More test cards:** https://stripe.com/docs/testing

### Step 5: Set Up Email Notifications (Optional)

#### Option A: SendGrid (Recommended)

1. Go to https://sendgrid.com
2. Create a free account (100 emails/day free)
3. Verify your email address
4. Go to Settings → API Keys
5. Create an API key
6. Add to Netlify environment variables:
   ```
   SENDGRID_API_KEY = your_key_here
   SENDGRID_FROM_EMAIL = noreply@rawtopianbliss.org
   ORDER_EMAIL = your-email@example.com
   ```
7. Install SendGrid in your project:
   ```bash
   pnpm add @sendgrid/mail
   ```

#### Option B: Netlify Forms (Easiest)

1. Go to Netlify dashboard
2. Select your site
3. Go to "Forms"
4. Enable form notifications
5. Add your email address
6. No code changes needed!

### Step 6: Go Live with Real Payments

When ready to accept real payments:

1. Complete Stripe account verification
2. Add business information
3. Connect bank account for payouts
4. Switch to LIVE API keys in Netlify:
   ```
   VITE_STRIPE_PUBLISHABLE_KEY = pk_live_your_key_here
   STRIPE_SECRET_KEY = sk_live_your_key_here
   ```
5. Redeploy your site
6. Test with a small real payment
7. Start accepting orders!

## 💰 Stripe Pricing

**Per Transaction:**
- 2.9% + $0.30 per successful card charge
- No monthly fees
- No setup fees
- No hidden costs

**Example:**
- $99 order = $3.17 fee (you receive $95.83)
- $149 order = $4.62 fee (you receive $144.38)

## 🔒 Security Features

**Built-in Protection:**
- PCI-compliant payment processing
- Encrypted card data
- Fraud detection
- 3D Secure authentication
- Chargeback protection

**Your website never stores card numbers** - Stripe handles all sensitive data securely.

## 📧 Email Notifications

After each successful payment, you'll receive an email with:

```
New Order Received - Rawtopian Bliss

ORDER DETAILS:
--------------
Package: Pick 6
Price: $99
Location: Charlotte

CUSTOMER INFORMATION:
--------------------
Name: John Doe
Email: john@example.com
Phone: (555) 123-4567
Delivery Address: 123 Main St, Charlotte, NC 28202

ITEMS ORDERED:
-------------
  - Rainbow Salad Bowl x 2
  - Raw Veggie Burger x 1
  - Mac & Cheese Plate x 1
  - Stuffed Bell Peppers x 2

CUSTOMER COMMENTS:
-----------------
Please deliver after 5 PM

PAYMENT INFORMATION:
-------------------
Payment Intent ID: pi_xxxxxxxxxxxxx
Status: Paid
```

## 🧪 Testing Checklist

Before going live, test:

- [ ] Can select location and package
- [ ] Can add items with +/- buttons
- [ ] Checkout button appears when ready
- [ ] Form requires all fields
- [ ] Test card (4242...) works
- [ ] Declined card (4000...) shows error
- [ ] Success page appears after payment
- [ ] Email notification arrives
- [ ] Order details are correct
- [ ] Can place another order
- [ ] Works on mobile devices

## 🎨 Customization

### Change Button Text

Edit `src/GetDelivered.jsx`:
```javascript
<button type="submit" className="submit-order-btn">
  {processing ? 'Processing...' : `Pay $${orderDetails.price}`}
</button>
```

### Change Success Message

Edit `src/GetDelivered.jsx`:
```javascript
<h1>🎉 Order Confirmed!</h1>
<p>Thank you for your order! ...</p>
```

### Change Email Format

Edit `api/send-order-confirmation.js`:
```javascript
const emailBody = `
Your custom email template here
`;
```

## 🆘 Troubleshooting

### "Stripe is not defined" Error
- Check that VITE_STRIPE_PUBLISHABLE_KEY is set in Netlify
- Redeploy after adding environment variables
- Clear browser cache

### Payment Fails in Test Mode
- Use test card: 4242 4242 4242 4242
- Check Stripe dashboard for error details
- Verify API keys are correct

### Email Not Received
- Check spam folder
- Verify SendGrid API key is correct
- Check SendGrid dashboard for delivery status
- Ensure ORDER_EMAIL is set correctly

### "Invalid API Key" Error
- Check that keys don't have extra spaces
- Verify you're using the correct key (test vs live)
- Regenerate keys in Stripe dashboard if needed

## 📊 Managing Orders

### View Orders in Stripe Dashboard

1. Go to https://dashboard.stripe.com
2. Click "Payments"
3. See all transactions
4. Click any payment to see details
5. View customer info, items, metadata

### Refund an Order

1. Find the payment in Stripe dashboard
2. Click "Refund"
3. Enter amount (full or partial)
4. Add reason
5. Confirm refund
6. Customer receives refund in 5-10 days

### Export Orders

1. Go to Stripe dashboard
2. Click "Payments"
3. Click "Export"
4. Choose date range
5. Download CSV file

## 🌟 Best Practices

**For Testing:**
- Always test with Stripe test cards first
- Test both successful and failed payments
- Test on different devices and browsers
- Verify email notifications work

**For Production:**
- Complete Stripe account verification
- Use LIVE API keys only when ready
- Monitor Stripe dashboard regularly
- Respond to customer inquiries promptly
- Keep Stripe account information updated

**For Security:**
- Never share your Secret API key
- Don't commit API keys to GitHub
- Use environment variables only
- Enable two-factor authentication on Stripe

## 📞 Support

**Stripe Support:**
- Documentation: https://stripe.com/docs
- Support: https://support.stripe.com
- Status: https://status.stripe.com

**SendGrid Support:**
- Documentation: https://docs.sendgrid.com
- Support: https://support.sendgrid.com

## 🎉 You're Ready!

Your payment system is fully configured and ready to accept orders. Follow the setup steps above, test thoroughly, and start selling your delicious raw vegan meals!

---

**Questions?** Review this guide or check the Stripe documentation.

