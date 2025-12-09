import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../../shared-components/product-card/product-card';
import { fadeScaleAnimation } from '../../app/animations/page-animations';

@Component({
  selector: 'app-featured',
  imports: [ProductCard, CommonModule],
  templateUrl: './featured.html',
  styleUrl: './featured.scss',
  animations: [fadeScaleAnimation]
})
export class Featured {
  protected isHovered: boolean = false;
  protected showIndexes: number = 4;
  protected activeIndex: number = 1;
  protected isAnimating: boolean = false;

  constructor() {}

  protected onClick(index: number) {
    if (this.isAnimating) return; // Prevent rapid clicking
    
    this.isAnimating = true;
    
    // Delay for smooth animation
    setTimeout(() => {
      this.showIndexes = 4 * index;
      this.activeIndex = index;
      
      setTimeout(() => {
        this.isAnimating = false;
      }, 500);
    }, 100);
  }
}
