import { Component, inject } from '@angular/core';
import { Btn } from "../btn/btn";
import { Footer } from "../footer/footer";
import { CommonModule } from '@angular/common';
import { ProductService } from '../product-card/product.service';

interface Product {
    name: string;
    imgUrl: string;
    price : string;
    quantity: number;
}

@Component({
  selector: 'app-card-payment',
  imports: [Btn, Footer, CommonModule],
  templateUrl: './card-payment.html',
  styleUrl: './card-payment.scss'
})
export class CardPayment {
  private productService  = inject(ProductService);
  products: Product[] = this.productService.getboughtProducts()
  hasProducts : boolean = this.products.length !== 0;
  subTotal: number = this.productService.getSubTotalPrice();
  getPriceValue(price: string): number {
    return Number(price.replace('$', ''));
  }
  onChangeQuantity(product:Product, change: number) {
    const currentProduct =  this.products[this.products.indexOf(product)]
    if(currentProduct.quantity === 1 && change === -1) {
      this.productService.updateBoughtProducs(product);
      this.products = this.productService.getboughtProducts();
    }
    if(!this.products.length) this.hasProducts = false;
    currentProduct.quantity += change;
  }
}
