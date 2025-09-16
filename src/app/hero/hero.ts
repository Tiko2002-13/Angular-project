import { Component, inject } from '@angular/core';
import { Btn } from '../btn/btn';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductService } from '../product-card/product.service';
@Component({
  selector: 'app-hero',
  imports: [CommonModule, Btn, RouterLink, RouterLinkActive],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
   private productService = inject(ProductService);


protected products = [{}, {}, {}];
protected selectedProduct = this.products[0];

  protected activeindex = 0;
  title = 'Best Headphones For Your Life....';
  descryption: string = 'New Trendy Collection Headphones';
  currentUrl: string = 'assets/headphones.png';
  lightImageUrl = 'assets/hero-lamp.png';
  headphoneImageUrl = 'assets/headphones.png';
  discountImageUrl = 'assets/discount.png';
  watchImageUrl = 'assets/watch.png';
  notbookImageUrl = 'assets/notebook.png';
  urls = [this.headphoneImageUrl, this.notbookImageUrl, this.watchImageUrl];

  constructor() {}
 
  protected onClick(index: number) {
    this.selectedProduct = this.products[index];

    setTimeout(() => {
      this.currentUrl = this.urls[index];
      this.activeindex = index;

      if (index == 0) {
        this.title = 'Best Headphones For Your Life....';
        this.descryption = 'New Trendy Collection Headphones';
      } else if (index == 1) {
        this.title = 'Best Laptop For Your Life....';
        this.descryption = 'New Trendy Collection Laptop';
      } else {
        this.title = 'Best Game Console For Your Life....';
        this.descryption = 'New Trendy Collection Game Console';
      }
    }, 200);
  }

  onShopping() {
    this.productService.sendProduct(
      this.productService.getProducts()[this.activeindex]
    );
  }
}
