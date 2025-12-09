const functions = require('firebase-functions');
const admin = require('firebase-admin');
// Use environment variable or Firebase Functions config (required for security)
// Set via: firebase functions:config:set stripe.secret_key="your-key-here"
// Or via environment variable: STRIPE_SECRET_KEY
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || functions.config().stripe?.secret_key;
if (!stripeSecretKey) {
  throw new Error('STRIPE_SECRET_KEY must be set via environment variable or Firebase Functions config');
}
const stripe = require('stripe')(stripeSecretKey);
const cors = require('cors')({ origin: true });

admin.initializeApp();

// Create Stripe Checkout Session
exports.createCheckoutSession = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const { lineItems, successUrl, cancelUrl } = req.body;

      console.log('Received request:', { 
        hasLineItems: !!lineItems, 
        lineItemsCount: lineItems?.length || 0
      });

      // Validate request
      if (!lineItems || !Array.isArray(lineItems) || lineItems.length === 0) {
        return res.status(400).json({ error: 'No items in cart' });
      }

      // Create Stripe Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: successUrl || 'https://best--shop.web.app/payment/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: cancelUrl || 'https://best--shop.web.app/payment',
      });

      console.log('Checkout session created:', session.id);

      // Return both sessionId and URL
      res.json({ 
        sessionId: session.id,
        url: session.url 
      });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      res.status(500).json({ error: error.message });
    }
  });
});

// Verify payment after checkout
exports.verifyPayment = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const sessionId = req.query.sessionId || req.params.sessionId;
      
      if (!sessionId) {
        return res.status(400).json({ error: 'Session ID is required' });
      }

      const session = await stripe.checkout.sessions.retrieve(sessionId);

      res.json({ 
        success: session.payment_status === 'paid',
        paymentStatus: session.payment_status,
        amount: session.amount_total / 100, // Convert from cents
        customerEmail: session.customer_details?.email
      });
    } catch (error) {
      console.error('Error verifying payment:', error);
      res.status(500).json({ error: error.message });
    }
  });
});

