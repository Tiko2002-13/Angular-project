// Example Backend API for Stripe Checkout
// This should run on your server, NOT in the Angular app

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(express.json());

// Your Stripe Secret Key (from environment variable)
// YOUR_STRIPE_SECRET_KEY_HERE

// Create Checkout Session endpoint
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { lineItems, successUrl, cancelUrl } = req.body;

    // Validate request
    if (!lineItems || lineItems.length === 0) {
      return res.status(400).json({ error: 'No items in cart' });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl || 'https://best--shop.web.app/payment/success',
      cancel_url: cancelUrl || 'https://best--shop.web.app/payment',
      // Optional: Add customer email if user is logged in
      // customer_email: req.user?.email,
    });

    // Return both sessionId and URL for flexibility
    res.json({ 
      sessionId: session.id,
      url: session.url // Direct checkout URL
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Verify payment after checkout
app.get('/api/verify-payment/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      res.json({ 
        success: true, 
        paymentStatus: 'paid',
        amount: session.amount_total / 100 // Convert from cents
      });
    } else {
      res.json({ 
        success: false, 
        paymentStatus: session.payment_status 
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Environment variable setup:
// Create a .env file with:
// STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY_HERE

