# 💳 Stripe Payment Integration Setup Guide

## 🎯 Overview

Your app now has Stripe payment integration set up! This guide will help you complete the setup and connect it to a backend server.

## 📋 What's Been Implemented

✅ Stripe service created (`stripe.service.ts`)
✅ Payment component updated with Stripe checkout
✅ Environment files configured for Stripe keys
✅ Checkout button integrated in payment page

## 🔑 Step 1: Get Your Stripe API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Sign up or log in to your Stripe account
3. Go to **Developers** → **API keys**
4. Copy your **Publishable key** (starts with `pk_test_` for test mode)
5. Copy your **Secret key** (starts with `sk_test_` for test mode) - **Keep this secret!**

## 🔧 Step 2: Update Environment Files

Update these files with your Stripe publishable key:

### `src/environments/environment.ts` (Development)
```typescript
stripe: {
  publishableKey: "pk_test_YOUR_ACTUAL_KEY_HERE"
}
```

### `src/environments/environment.development.ts` (Development)
```typescript
stripe: {
  publishableKey: "pk_test_YOUR_ACTUAL_KEY_HERE"
}
```

### `src/environments/environment.production.ts` (Production)
```typescript
stripe: {
  publishableKey: "pk_live_YOUR_ACTUAL_KEY_HERE" // Use live key for production
}
```

## 🖥️ Step 3: Set Up Backend Server (Required)

**Important:** Stripe requires a backend server to securely create checkout sessions. You cannot create checkout sessions from the frontend alone.

### Option A: Use Firebase Cloud Functions (Recommended)

Create a Firebase Cloud Function to handle Stripe checkout:

```javascript
// functions/index.js
const functions = require('firebase-functions');
const stripe = require('stripe')(functions.config().stripe.secret_key);

exports.createCheckoutSession = functions.https.onCall(async (data, context) => {
  // Verify user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { lineItems, successUrl, cancelUrl } = data;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl || 'https://your-app.com/payment/success',
      cancel_url: cancelUrl || 'https://your-app.com/payment',
      customer_email: context.auth.token.email,
    });

    return { sessionId: session.id };
  } catch (error) {
    throw new functions.https.HttpsError('internal', error.message);
  }
});
```

### Option B: Use Node.js/Express Backend

```javascript
// server.js
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

app.post('/api/create-checkout-session', async (req, res) => {
  const { lineItems } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'https://your-app.com/payment/success',
      cancel_url: 'https://your-app.com/payment',
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

## 🔄 Step 4: Update Stripe Service

Once you have a backend, update `stripe.service.ts`:

```typescript
async createCheckoutSession(): Promise<string | null> {
  try {
    const products = this.productService.getboughtProducts();
    const subtotal = this.productService.getSubTotalPrice();
    const shipping = 100;
    const total = subtotal + shipping;

    const lineItems = products.map(product => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          images: [product.imgUrl],
        },
        unit_amount: Math.round(Number(product.price.replace('$', '')) * 100),
      },
      quantity: product.quantity,
    }));

    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: { name: 'Shipping' },
        unit_amount: shipping * 100,
      },
      quantity: 1,
    });

    // Call your backend API
    const response = await fetch('https://your-backend.com/api/create-checkout-session', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${await this.getAuthToken()}` // If using Firebase Auth
      },
      body: JSON.stringify({ 
        lineItems,
        successUrl: `${window.location.origin}/payment/success`,
        cancelUrl: `${window.location.origin}/payment`
      })
    });

    const { sessionId } = await response.json();
    return sessionId;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return null;
  }
}

async redirectToCheckout(sessionId: string): Promise<void> {
  if (!this.stripe) {
    this.stripe = await this.stripePromise;
  }

  if (!this.stripe) {
    throw new Error('Stripe failed to initialize');
  }

  const { error } = await this.stripe.redirectToCheckout({ sessionId });
  
  if (error) {
    throw new Error(error.message);
  }
}
```

## 🧪 Step 5: Test with Stripe Test Cards

Use these test card numbers in Stripe test mode:

- **Success:** `4242 4242 4242 4242`
- **Decline:** `4000 0000 0000 0002`
- **Requires Authentication:** `4000 0025 0000 3155`

Use any future expiry date, any 3-digit CVC, and any ZIP code.

## 📝 Step 6: Handle Payment Success/Cancel

Create success and cancel pages:

### `src/pages/payment-success/payment-success.ts`
```typescript
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment-success',
  template: `
    <div class="success-page">
      <h2>Payment Successful!</h2>
      <p>Thank you for your purchase.</p>
      <button (click)="goHome()">Continue Shopping</button>
    </div>
  `
})
export class PaymentSuccess {
  constructor(private router: Router, private route: ActivatedRoute) {
    // Check for session_id from Stripe
    this.route.queryParams.subscribe(params => {
      if (params['session_id']) {
        // Verify payment with your backend
        console.log('Payment session:', params['session_id']);
      }
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
```

Add route in `app.routes.ts`:
```typescript
{
  path: 'payment/success',
  loadComponent: () => import('../pages/payment-success/payment-success').then(m => m.PaymentSuccess)
}
```

## 🔒 Security Best Practices

1. **Never expose your secret key** in frontend code
2. **Always create checkout sessions on the backend**
3. **Verify payments on the backend** after successful checkout
4. **Use HTTPS** in production
5. **Validate amounts** on the backend before creating sessions

## 🚀 Current Implementation Status

✅ Frontend Stripe integration complete
✅ Payment button connected
✅ Cart items prepared for checkout
⏳ Backend API needed (see Step 3)
⏳ Stripe keys needed (see Step 1)

## 📚 Additional Resources

- [Stripe Checkout Documentation](https://stripe.com/docs/payments/checkout)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Stripe Testing Guide](https://stripe.com/docs/testing)

## 🎯 Next Steps

1. Get your Stripe API keys
2. Set up a backend server (Firebase Functions or Node.js)
3. Update the `createCheckoutSession` method to call your backend
4. Test with Stripe test cards
5. Deploy and test in production with live keys

