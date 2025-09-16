import { Component } from '@angular/core';
import { ProductCardV2 } from '../product-card-v2/product-card-v2';

@Component({
  selector: 'app-latest',
  imports: [ProductCardV2],
  templateUrl: './latest.html',
  styleUrl: './latest.scss'
})
export class Latest {
  saleIconUrl = 'assets/saleIcon.svg';
}
