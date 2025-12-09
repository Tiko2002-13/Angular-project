# 🚀 Stripe Payment - Quick Start

## ✅ What's Done

1. ✅ Stripe package installed
2. ✅ Stripe service created
3. ✅ Payment page updated with checkout button
4. ✅ Cart items prepared for Stripe checkout

## 🔑 What You Need to Do

### 1. Get Stripe Keys (5 minutes)

1. Go to https://dashboard.stripe.com/register
2. Create account (free for testing)
3. Go to **Developers** → **API keys**
4. Copy **Publishable key** (starts with `pk_test_`)

### 2. Add Key to Environment Files

Update `src/environments/environment.ts`:
```typescript
stripe: {
  publishableKey: "pk_test_YOUR_KEY_HERE"
}
```

### 3. Set Up Backend (Required for Production)

**Important:** You need a backend server to create Stripe checkout sessions securely.

**Quick Option - Firebase Functions:**
```bash
firebase init functions
cd functions
npm install stripe
```

Then create a function to handle checkout (see `STRIPE_SETUP.md` for full code).

## 🧪 Testing

1. Add items to cart
2. Go to payment page
3. Click "Proceed to checkout"
4. Currently shows alert (needs backend)
5. Once backend is set up, redirects to Stripe Checkout

## 📚 Full Documentation

See `STRIPE_SETUP.md` for complete setup instructions.

