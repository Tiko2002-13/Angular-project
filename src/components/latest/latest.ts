import { Component } from '@angular/core';
import { ProductCardV2 } from './product-card-v2/product-card-v2';
import { listAnimation } from '../../app/animations/page-animations';

@Component({
  selector: 'app-latest',
  imports: [ProductCardV2],
  templateUrl: './latest.html',
  styleUrl: './latest.scss',
  animations: [listAnimation]
})
export class Latest {
  itemCount: number = 6;
  itemsArray: number[] = Array.from({ length: this.itemCount }, (_, i) => i + 1);

  protected saleIconUrl = 'assets/saleIcon.svg';
}
