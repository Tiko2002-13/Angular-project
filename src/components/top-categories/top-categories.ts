import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TrendingProduct } from '../trending/trending-product/trending-product';
@Component({
  selector: 'app-top-categories',
  imports: [TrendingProduct, CommonModule],
  templateUrl: './top-categories.html',
  styleUrl: './top-categories.scss'
})
export class TopCategories {
  protected activeIndex : number = 0;

  constructor() {}

  protected onClick(index: number) {
    this.activeIndex = index;
  }
}

