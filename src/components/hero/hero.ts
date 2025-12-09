import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Btn } from '../../shared-components/btn/btn';
import { ProductService } from '../../shared-components/product-card/product.service';

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
  protected title = 'Best Headphones For Your Life....';
  protected descryption: string = 'New Trendy Collection Headphones';
  protected currentUrl: string = 'assets/headphones.png';
  protected lightImageUrl = 'assets/hero-lamp.png';
  protected headphoneImageUrl = 'assets/headphones.png';
  protected discountImageUrl = 'assets/discount.png';
  protected watchImageUrl = 'assets/watch.png';
  protected notbookImageUrl = 'assets/notebook.png';
  private urls = [
    this.headphoneImageUrl,
    this.notbookImageUrl,
    this.watchImageUrl,
  ];

  constructor() {}

  protected onClick(index: number) {
    this.selectedProduct = this.products[index];

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
  }

  protected onShopping() {
    this.productService.sendProduct(
      this.productService.getProducts()[this.activeindex]
    );
  }
}
