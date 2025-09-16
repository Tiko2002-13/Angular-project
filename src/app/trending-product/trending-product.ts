import { Component, Input } from '@angular/core';
import { Btn } from "../btn/btn";
import { CommonModule } from '@angular/common';
import { RouterLink} from '@angular/router';

interface TrendProduct {
  name: string;
  imgUrl: string;
}

@Component({
  selector: 'app-trending-product',
  imports: [Btn, CommonModule, RouterLink],
  templateUrl: './trending-product.html',
  styleUrl: './trending-product.scss'
})
export class TrendingProduct {
  @Input() ind !: number;
  isHovered : boolean = false;
  trendingProduct1: TrendProduct = {
    name: "Perfume",
    imgUrl: 'assets/trending2.svg'
  }
  trendingProduct2: TrendProduct = {
    name: "Present Box",
    imgUrl: 'assets/trending1.svg'
  } 
  trendingProduct3: TrendProduct = {
    name: "Braclet",
    imgUrl: 'assets/trending3.svg'
  } 
  trendingProduct4: TrendProduct = {
    name: "Ring",
    imgUrl: 'assets/trending4.svg'
  }  
  trendingProducts: TrendProduct[] = [this.trendingProduct1,this.trendingProduct2,this.trendingProduct3,this.trendingProduct4]

  onHover(isHovered: boolean) {
    this.isHovered = isHovered;
  }
}
