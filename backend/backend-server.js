const express = require('express');
if (!process.env.STRIPE_SECRET_KEY) {
  console.error('ERROR: STRIPE_SECRET_KEY environment variable is required!');
  console.error('Set it with: export STRIPE_SECRET_KEY="your-key-here"');
  process.exit(1);
}
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const app = express();

app.use(cors({
  origin: [
    'http://localhost:4200',
    'https://best--shop.web.app',
    'https://best--shop.firebaseapp.com'
  ],
  credentials: true
}));

app.use(express.json());

app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { lineItems, successUrl, cancelUrl } = req.body;

    console.log('Received request:', { 
      hasLineItems: !!lineItems, 
      lineItemsCount: lineItems?.length || 0,
      body: req.body 
    });

    if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
      return res.status(400).json({ error: 'No items in cart' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl || 'https://best--shop.web.app/payment/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: cancelUrl || 'https://best--shop.web.app/payment',
    });

    console.log('Checkout session created:', session.id);

    res.json({ 
      sessionId: session.id,
      url: session.url 
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/verify-payment/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    res.json({ 
      success: session.payment_status === 'paid',
      paymentStatus: session.payment_status,
      amount: session.amount_total / 100,
      customerEmail: session.customer_details?.email
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Stripe Backend Server running on http://localhost:${PORT}`);
  console.log(`📝 Ready to accept checkout requests at /api/create-checkout-session`);
});

