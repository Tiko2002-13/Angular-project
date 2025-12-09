import { Component, inject } from '@angular/core';
import { Btn } from "../../shared-components/btn/btn";

import { CommonModule } from '@angular/common';
import { Footer } from '../../components/footer/footer';
import { ProductService } from '../../shared-components/product-card/product.service';
import { StripeService } from '../../app/services/stripe.service';
import { Header } from '../../components/header/header';
import { RouterLink, Router } from '@angular/router';
import Product from '../../app/models/product.interface';




@Component({
  selector: 'app-card-payment',
  imports: [Header, Btn, Footer, CommonModule, RouterLink],
  templateUrl: './card-payment.html',
  styleUrl: './card-payment.scss'
})
export class CardPayment {
  private productService = inject(ProductService);
  private stripeService = inject(StripeService);
  private router = inject(Router);

  protected products: Product[] = this.productService.getboughtProducts();
  protected hasProducts: boolean = this.products.length !== 0;
  protected subTotal: number = this.productService.getSubTotalPrice();
  protected shipping: number = 100;
  protected total: number = this.subTotal + this.shipping;
  protected isProcessing: boolean = false;
  protected paymentError: string = '';

  constructor() {
    this.productService.boughtProducts$.subscribe(() => {
      this.products = this.productService.getboughtProducts();
      this.hasProducts = this.products.length !== 0;
      this.subTotal = this.productService.getSubTotalPrice();
      this.total = this.subTotal + this.shipping;
    });
  }

  getPriceValue(price: string): number {
    return Number(price.replace('$', ''));
  }

  onChangeQuantity(product: Product, change: number) {
    this.productService.updateBoughtProducs(product, change);
    this.products = this.productService.getboughtProducts();
    if (!this.products.length) this.hasProducts = false;
    this.subTotal = this.productService.getSubTotalPrice();
    this.total = this.subTotal + this.shipping;
  }

  onClearCart() {
    this.productService.clearBoughtProducts();
    this.products = this.productService.getboughtProducts();
    this.hasProducts = false;
    this.subTotal = 0;
    this.total = 0;
  }

  async onProceedToCheckout() {
    if (!this.hasProducts) {
      this.paymentError = 'Your cart is empty. Please add items before checkout.';
      return;
    }

    if (this.isProcessing) {
      return; // Prevent multiple clicks
    }

    this.isProcessing = true;
    this.paymentError = '';

    try {
      const sessionData = await this.stripeService.createCheckoutSession();
      
      if (sessionData) {
        await this.stripeService.redirectToCheckout(sessionData);
        
      } else {
        this.paymentError = 'Failed to create checkout session. Please try again.';
      }
    } catch (error: any) {
      console.error('Checkout error:', error);
      this.paymentError = error?.message || 'An error occurred during checkout. Please try again.';
    } finally {
      this.isProcessing = false;
    }
  }
}


