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
    const stripeKey = environment.stripe?.publishableKey || '';
    this.stripePromise = loadStripe(stripeKey);
    this.stripePromise.then(stripe => {
      this.stripe = stripe;
    });
  }

  async createCheckoutSession(): Promise<{ sessionId: string; url?: string } | null> {
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
            ...(product.imgUrl ? { images: [product.imgUrl] } : {}),
          },
          unit_amount: Math.round(Number(product.price.replace('$', '')) * 100),
        },
        quantity: product.quantity,
      }));

      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Shipping',
          },
          unit_amount: shipping * 100,
        },
        quantity: 1,
      });

      let backendUrl = environment.apiUrl;
      
      if (!backendUrl || backendUrl.includes('localhost') || backendUrl.includes('127.0.0.1')) {
        if (environment.production) {
          throw new Error('Backend server URL must be configured for production. Please update environment.production.ts with your deployed backend URL (e.g., from Render, Railway, or other free hosting).');
        } else {
          backendUrl = 'http://localhost:3000';
        }
      }
      
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
        
        return {
          sessionId: data.sessionId,
          url: data.url // Optional: direct checkout URL
        };
      } catch (error: any) {
        console.error('Error calling backend API:', error);
        
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

  async redirectToCheckout(sessionData: { sessionId: string; url?: string }): Promise<void> {
    if (sessionData.url) {
      window.location.href = sessionData.url;
      return;
    }

    if (!this.stripe) {
      this.stripe = await this.stripePromise;
    }

    if (!this.stripe) {
      throw new Error('Stripe failed to initialize. Please check your Stripe publishable key.');
    }

    try {
      const result = await (this.stripe as any).redirectToCheckout({ 
        sessionId: sessionData.sessionId 
      });

      if (result?.error) {
        throw new Error(result.error.message || 'Failed to redirect to checkout');
      }
    } catch (error: any) {
      console.warn('Using fallback redirect method');
      window.location.href = `https://checkout.stripe.com/c/pay/${sessionData.sessionId}`;
    }
  }

  async processPayment(amount: number, paymentMethodId: string): Promise<{ success: boolean; error?: string }> {
    try {

      console.log('Processing payment:', { amount, paymentMethodId });
      return { success: true };
    } catch (error: any) {
      console.error('Payment processing error:', error);
      return { success: false, error: error.message };
    }
  }

  async getStripe(): Promise<Stripe | null> {
    return this.stripePromise;
  }
}

