import { Component } from '@angular/core';
import { TrendingProduct } from '../trending-product/trending-product';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-top-categories',
  imports: [TrendingProduct, CommonModule],
  templateUrl: './top-categories.html',
  styleUrl: './top-categories.scss'
})
export class TopCategories {
  activeIndex : number = 0;
  
  onClick(index: number) {
    this.activeIndex = index;
  }
}

