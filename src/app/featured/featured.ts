import { Component } from '@angular/core';
import { ProductCard } from '../product-card/product-card';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-featured',
  imports: [ProductCard, CommonModule],
  templateUrl: './featured.html',
  styleUrl: './featured.scss',
})
export class Featured {
  isHovered: boolean = false;
  showIndexes: number = 4;
  activeIndex: number = 1;

constructor() {}

  onClick(index: number) {
    this.showIndexes = 4 * index;
    this.activeIndex = index;
  }
}
