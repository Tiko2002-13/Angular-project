import { Component } from '@angular/core';
import { ProductCard } from '../../shared-components/product-card/product-card';


@Component({
  selector: 'app-trending',
  imports: [ProductCard],
  templateUrl: './trending.html',
  styleUrl: './trending.scss'
})
export class Trending {

}
