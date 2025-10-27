# Upload Checklist - Get Your Site Live in 20 Minutes!

## ✅ Pre-Upload Checklist

- [ ] Extracted the ZIP file
- [ ] Opened the `rawtopian-COMPLETE-WITH-STRIPE` folder
- [ ] Can see these folders: `src`, `api`, `public`
- [ ] Can see these files: `index.html`, `package.json`, `vite.config.js`, `netlify.toml`

## 📤 Upload to GitHub (10 minutes)

- [ ] Went to https://github.com/markelstringfellow/rawtopian-bliss-website
- [ ] Clicked "Add file" → "Upload files"
- [ ] Dragged ALL folders and files from the package
- [ ] Entered commit message: "Complete site with Stripe payment"
- [ ] Clicked "Commit changes"
- [ ] Upload completed successfully

## ⏱️ Wait for Netlify (2-3 minutes)

- [ ] Went to https://app.netlify.com/projects/rawtopianbliss/deploys
- [ ] Saw new deploy starting
- [ ] Waited for "Published" status (green checkmark)
- [ ] Build succeeded (no errors)

## 🧪 Test the Site (2 minutes)

- [ ] Went to rawtopianbliss.org
- [ ] Pressed Ctrl+Shift+R (hard refresh)
- [ ] Homepage loaded correctly
- [ ] Clicked "Get Delivered" button
- [ ] Ordering page appeared ✅
- [ ] Can see location dropdown
- [ ] Can see package selection (Pick 6 / Pick 12)
- [ ] Can see all 12 food items
- [ ] +/− buttons work
- [ ] Can click "Proceed to Checkout"

## 🔑 Set Up Stripe (10 minutes)

- [ ] Went to https://stripe.com
- [ ] Created free account
- [ ] Verified email
- [ ] Went to Dashboard → Developers → API keys
- [ ] Copied Publishable key (pk_test_...)
- [ ] Copied Secret key (sk_test_...)
- [ ] Went to Netlify → Site settings → Environment variables
- [ ] Added `VITE_STRIPE_PUBLISHABLE_KEY` with publishable key
- [ ] Added `STRIPE_SECRET_KEY` with secret key
- [ ] Clicked "Save"
- [ ] Went to Deploys → Trigger deploy → Clear cache and deploy
- [ ] Waited for new deploy to finish

## 💳 Test Payment (2 minutes)

- [ ] Went to rawtopianbliss.org
- [ ] Hard refreshed (Ctrl+Shift+R)
- [ ] Clicked "Get Delivered"
- [ ] Selected location: Charlotte
- [ ] Selected package: Pick 6
- [ ] Selected 6 food items
- [ ] Clicked "Proceed to Checkout"
- [ ] Filled in customer information:
  - Name: Test Customer
  - Email: test@example.com
  - Phone: 555-1234
  - Address: 123 Test St
- [ ] Entered test card: 4242 4242 4242 4242
- [ ] Entered expiry: 12/25
- [ ] Entered CVC: 123
- [ ] Clicked "Pay $99"
- [ ] Saw "Order Confirmed!" message ✅
- [ ] Checked email for order notification

## 🎉 You're Live!

- [ ] Site is working perfectly
- [ ] "Get Delivered" button works
- [ ] Ordering system works
- [ ] Payment processing works
- [ ] Email notifications work
- [ ] Ready to take real orders!

## 📝 Notes

**If any step fails:**
1. Check the troubleshooting section in README.md
2. Review Netlify deploy logs for errors
3. Verify all files uploaded correctly
4. Check browser console (F12) for JavaScript errors

**When ready for real payments:**
1. Go to Stripe Dashboard
2. Switch to "Live mode" (toggle in top right)
3. Copy LIVE API keys (pk_live_... and sk_live_...)
4. Replace TEST keys in Netlify with LIVE keys
5. Trigger new deploy
6. Test with real card (will charge real money!)

**Stripe Fees:**
- 2.9% + $0.30 per transaction
- $99 order = $3.17 fee (you keep $95.83)
- $149 order = $4.62 fee (you keep $144.38)

---

**Total Time:** ~20-25 minutes from start to finish!

**You're now ready to take orders for your delicious raw vegan meals!** 🌱

