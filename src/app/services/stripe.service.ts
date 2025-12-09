import { Injectable, inject } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from '../../environments/environment';
import { ProductService } from '../../shared-components/product-card/product.service';
import Product from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private productService = inject(ProductService);
  private stripePromise: Promise<Stripe | null>;
  private stripe: Stripe | null = null;

  constructor() {
    // Initialize Stripe with your publishable key
    const stripeKey = environment.stripe?.publishableKey || '';
    this.stripePromise = loadStripe(stripeKey);
    this.stripePromise.then(stripe => {
      this.stripe = stripe;
    });
  }

  /**
   * Create a Stripe Checkout Session
   * Note: This requires a backend server to create the session securely
   * Returns the checkout session URL or session ID
   */
  async createCheckoutSession(): Promise<{ sessionId: string; url?: string } | null> {
    try {
      const products = this.productService.getboughtProducts();
      const subtotal = this.productService.getSubTotalPrice();
      const shipping = 100; // $100 shipping
      const total = subtotal + shipping;

      // Prepare line items for Stripe
      const lineItems = products.map(product => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            ...(product.imgUrl ? { images: [product.imgUrl] } : {}),
          },
          unit_amount: Math.round(Number(product.price.replace('$', '')) * 100), // Convert to cents
        },
        quantity: product.quantity,
      }));

      // Add shipping as a line item
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Shipping',
          },
          unit_amount: shipping * 100, // Convert to cents
        },
        quantity: 1,
      });

      // Use backend API URL from environment
      let backendUrl = environment.apiUrl;
      
      // If apiUrl is not set or is localhost, use defaults
      if (!backendUrl || backendUrl.includes('localhost') || backendUrl.includes('127.0.0.1')) {
        if (environment.production) {
          // Production: Need deployed backend URL
          throw new Error('Backend server URL must be configured for production. Please update environment.production.ts with your deployed backend URL (e.g., from Render, Railway, or other free hosting).');
        } else {
          // Development: Use local backend server
          backendUrl = 'http://localhost:3000';
        }
      }
      
      // Remove /api suffix if present since we're adding it in the path
      if (backendUrl.endsWith('/api')) {
        backendUrl = backendUrl.replace('/api', '');
      }
      
      try {
        const apiUrl = `${backendUrl}/api/create-checkout-session`;
        console.log('Calling backend:', apiUrl);
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            lineItems,
            successUrl: `${window.location.origin}/payment/success`,
            cancelUrl: `${window.location.origin}/payment`
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: response.statusText }));
          throw new Error(errorData.error || `Backend error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Checkout session created:', data);
        
        // Backend can return either sessionId or url
        return {
          sessionId: data.sessionId,
          url: data.url // Optional: direct checkout URL
        };
      } catch (error: any) {
        console.error('Error calling backend API:', error);
        
        // Provide helpful error message
        if (error.message?.includes('Failed to fetch') || error.message?.includes('ERR_NAME_NOT_RESOLVED')) {
          throw new Error('Cannot connect to backend server. Make sure the backend is running on ' + backendUrl);
        }
        
        throw error;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      return null;
    }
  }

  /**
   * Redirect to Stripe Checkout
   * This method will redirect the user to Stripe's hosted checkout page
   */
  async redirectToCheckout(sessionData: { sessionId: string; url?: string }): Promise<void> {
    // If backend provides direct URL, use it
    if (sessionData.url) {
      window.location.href = sessionData.url;
      return;
    }

    // Otherwise, use Stripe.js to redirect
    if (!this.stripe) {
      this.stripe = await this.stripePromise;
    }

    if (!this.stripe) {
      throw new Error('Stripe failed to initialize. Please check your Stripe publishable key.');
    }

    // Use Stripe's redirectToCheckout method
    try {
      const result = await (this.stripe as any).redirectToCheckout({ 
        sessionId: sessionData.sessionId 
      });

      if (result?.error) {
        throw new Error(result.error.message || 'Failed to redirect to checkout');
      }
    } catch (error: any) {
      // Fallback: construct checkout URL manually (not recommended but works)
      console.warn('Using fallback redirect method');
      // Note: This is a fallback - ideally backend should return the URL
      window.location.href = `https://checkout.stripe.com/c/pay/${sessionData.sessionId}`;
    }
  }

  /**
   * Process payment using Stripe Elements (for custom checkout)
   * This is an alternative to Checkout if you want a custom payment form
   */
  async processPayment(amount: number, paymentMethodId: string): Promise<{ success: boolean; error?: string }> {
    try {
      // In a real implementation, you would call your backend API here
      // Example:
      // const response = await fetch('/api/process-payment', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ amount, paymentMethodId })
      // });
      // return await response.json();

      console.log('Processing payment:', { amount, paymentMethodId });
      return { success: true };
    } catch (error: any) {
      console.error('Payment processing error:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Get Stripe instance
   */
  async getStripe(): Promise<Stripe | null> {
    return this.stripePromise;
  }
}

