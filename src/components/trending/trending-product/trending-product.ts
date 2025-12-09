import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink} from '@angular/router';
import { Btn } from '../../../shared-components/btn/btn';
import { ProductService } from '../../../shared-components/product-card/product.service';

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
  protected isHovered : boolean = false;
  protected trendingProduct1: TrendProduct = {
    name: "Perfume",
    imgUrl: 'assets/trending2.svg'
  }
  protected trendingProduct2: TrendProduct = {
    name: "Present Box",
    imgUrl: 'assets/trending1.svg'
  } 
  protected trendingProduct3: TrendProduct = {
    name: "Braclet",
    imgUrl: 'assets/trending3.svg'
  } 
  protected trendingProduct4: TrendProduct = {
    name: "Ring",
    imgUrl: 'assets/trending4.svg'
  }  
  protected trendingProducts: TrendProduct[] = [this.trendingProduct1,this.trendingProduct2,this.trendingProduct3,this.trendingProduct4]
 
  constructor(private router: Router, private productService: ProductService) {}

  protected onHover(isHovered: boolean) {
    this.isHovered = isHovered;
  }

  protected onView(product: TrendProduct) {
    this.productService.sendProduct({...product,price: '',quantity: 0});
    this.router.navigate(['/products', product.name]);
  }
}
