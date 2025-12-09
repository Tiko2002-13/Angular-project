# 🚀 Quick Start: Stripe Backend Server

## ⚡ Fast Setup (5 minutes)

### Step 1: Install Dependencies

```bash
npm install express stripe cors
```

Or use the provided package.json:
```bash
npm install --package-lock-only --legacy-peer-deps
npm install
```

### Step 2: Start the Server

```bash
node backend-server.js
```

You should see:
```
🚀 Stripe Backend Server running on http://localhost:3000
📝 Ready to accept checkout requests at /api/create-checkout-session
```

### Step 3: Test Your Payment

1. Make sure your Angular app is running
2. Add items to cart
3. Go to payment page
4. Click "Proceed to checkout"
5. You'll be redirected to Stripe Checkout!

## 🔧 Configuration

The backend server is already configured with:
- ✅ Your Stripe secret key
- ✅ CORS enabled for your Angular app
- ✅ Checkout session creation
- ✅ Payment verification endpoint

## 🌐 Deploy Backend

### Option 1: Heroku
```bash
heroku create your-app-name
git push heroku main
```

### Option 2: Railway
```bash
railway init
railway up
```

### Option 3: Firebase Functions
See `STRIPE_SETUP.md` for Firebase setup.

## 📝 Update Frontend

After deploying, update `environment.ts`:
```typescript
apiUrl: 'https://your-backend-url.com/api'
```

## ✅ That's It!

Your payment system is now ready to accept real payments!

