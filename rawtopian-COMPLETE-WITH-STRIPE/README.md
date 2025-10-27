# Rawtopian Bliss - Complete Website with Stripe Payment Integration

## 📦 What's Included

This package contains your complete Rawtopian Bliss website with:

✅ **Homepage** - Sticky header, "DO YOU LIKE IT RAW?" tagline, food showcase
✅ **Get Delivered Page** - Complete ordering system with Stripe payment
✅ **Stripe Integration** - Secure credit card processing
✅ **React Router** - Proper navigation between pages
✅ **All Assets** - 12 food images, logos, chef photo
✅ **Build Configuration** - Fixed Vite config for Netlify deployment
✅ **API Endpoints** - Payment processing and email notifications

## 📂 File Structure

```
rawtopian-COMPLETE-WITH-STRIPE/
├── src/
│   ├── assets/          # All images (Food1-12, logos, chef photo)
│   ├── components/      # UI components
│   ├── hooks/           # React hooks
│   ├── lib/             # Utility functions
│   ├── App.jsx          # Main app with routing
│   ├── App.css          # Main styles
│   ├── GetDelivered.jsx # Ordering page with Stripe
│   ├── GetDelivered.css # Ordering page styles
│   ├── main.jsx         # Entry point with BrowserRouter
│   └── index.css        # Global styles
├── api/
│   ├── create-payment-intent.js    # Stripe payment API
│   └── send-order-confirmation.js  # Email notification API
├── public/              # Static assets
├── index.html           # HTML entry point
├── package.json         # Dependencies (includes Stripe)
├── vite.config.js       # Build config (Stripe externalized)
├── netlify.toml         # Netlify deployment config
└── README.md            # This file
```

## 🚀 How to Upload to GitHub

### Method 1: Web Upload (Easiest)

1. **Go to your GitHub repository:**
   https://github.com/markelstringfellow/rawtopian-bliss-website

2. **Delete old files** (or just overwrite by uploading):
   - You can skip this if you want to overwrite

3. **Upload all files:**
   - Click "Add file" → "Upload files"
   - Drag ALL folders and files from this package
   - Commit message: `Complete site with Stripe payment integration`
   - Click "Commit changes"

4. **Wait for Netlify:**
   - Go to https://app.netlify.com/projects/rawtopianbliss/deploys
   - Wait 2-3 minutes for "Published" status

5. **Test your site:**
   - Go to rawtopianbliss.org
   - Press Ctrl+Shift+R (hard refresh)
   - Click "Get Delivered" button
   - It should work!

## 🔑 Stripe Setup (Required for Payments)

### Step 1: Create Stripe Account

1. Go to https://stripe.com
2. Sign up for free account
3. Complete verification (takes 5-10 minutes)

### Step 2: Get API Keys

1. Go to Stripe Dashboard → Developers → API keys
2. You'll see two keys:
   - **Publishable key** (starts with `pk_test_...`)
   - **Secret key** (starts with `sk_test_...`)
3. Copy both keys

### Step 3: Add Keys to Netlify

1. Go to https://app.netlify.com
2. Select your rawtopianbliss site
3. Go to Site settings → Environment variables
4. Click "Add a variable"
5. Add these two variables:

   **Variable 1:**
   - Key: `VITE_STRIPE_PUBLISHABLE_KEY`
   - Value: Your publishable key (pk_test_...)

   **Variable 2:**
   - Key: `STRIPE_SECRET_KEY`
   - Value: Your secret key (sk_test_...)

6. Click "Save"
7. Go to Deploys → Trigger deploy → Clear cache and deploy

### Step 4: Test Payment

Use these test cards (won't charge real money):

**Success:**
- Card: 4242 4242 4242 4242
- Expiry: 12/25 (any future date)
- CVC: 123 (any 3 digits)
- ZIP: 12345 (any 5 digits)

**Decline:**
- Card: 4000 0000 0000 0002

## 💰 Stripe Pricing

- **2.9% + $0.30** per successful transaction
- No monthly fees
- Example: $99 order = $3.17 fee (you keep $95.83)

## 📧 Email Notifications

The site is set up to send you an email after each order with:
- Customer name, email, phone, address
- Location selected
- Package type (Pick 6 or Pick 12)
- Items ordered
- Total price
- Payment confirmation

To enable emails, see the `EMAIL_SETUP_GUIDE.md` in the documentation.

## ✅ Features Included

### Homepage
- Sticky header navigation
- "DO YOU LIKE IT RAW?" bold yellow tagline
- Video background hero section
- Side-by-side "Get Delivered" and "Get Shipped" buttons
- Food showcase with 10 items (dark green descriptions)
- About section with Chef Saa Shalom
- Call-to-action section
- Footer with social links

### Get Delivered Page
- Location dropdown (Charlotte, Rock Hill, Columbia)
- Package selection (Pick 6 for $99, Pick 12 for $149)
- 12 food items with photos
- +/− buttons to add/remove items
- Real-time counter (Selected: X / 6 or 12)
- Comments/questions text area
- Customer information form (name, email, phone, address)
- Stripe credit card payment
- Order confirmation page
- Email notification to you

## 🔧 Technical Details

### Dependencies
- React 18
- React Router DOM 6
- Stripe.js & React Stripe.js
- Vite (build tool)
- Tailwind CSS
- Other UI libraries

### Build Configuration
- Vite configured to externalize Stripe (fixes build error)
- Netlify redirects configured for SPA routing
- Optimized build output

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile responsive
- Touch-friendly interface

## 🆘 Troubleshooting

### Build Fails on Netlify
- Check that `vite.config.js` has the Stripe externalization
- Verify all files uploaded correctly
- Check Netlify build log for specific errors

### Button Doesn't Work
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Check that `GetDelivered.jsx` is in `src/` folder
- Verify `App.jsx` has routing configured
- Check browser console for errors (F12)

### Payment Doesn't Work
- Verify Stripe API keys are added to Netlify environment variables
- Check that keys start with `pk_test_` and `sk_test_`
- Make sure you triggered a new deploy after adding keys
- Use test card 4242 4242 4242 4242

### Images Don't Load
- Check that all images are in `src/assets/` folder
- Verify image file names match (Food1.JPG through Food12.JPG)
- Check case sensitivity (JPG vs jpg)

## 📞 Support

If you need help:
1. Check the troubleshooting section above
2. Review the Netlify deploy logs
3. Check browser console for errors
4. Verify all files uploaded correctly

## 🎉 You're Ready!

Once you upload these files and add your Stripe keys, your complete ordering system will be live and ready to take orders!

Your customers will be able to:
1. Visit rawtopianbliss.org
2. Click "Get Delivered"
3. Choose their location and package
4. Select their favorite raw vegan meals
5. Enter their information
6. Pay securely with credit card
7. Receive confirmation

And you'll receive an email with all the order details!

---

**Next Steps:**
1. Upload files to GitHub (10 minutes)
2. Set up Stripe account (10 minutes)
3. Add API keys to Netlify (5 minutes)
4. Test with test card (2 minutes)
5. **Start taking orders!** 🌱

