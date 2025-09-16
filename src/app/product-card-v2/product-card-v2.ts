import { Component,inject,Input } from '@angular/core';
import { ProductService } from '../product-card/product.service';
import { CommonModule } from '@angular/common';
interface Product {
    name: string;
    imgUrl: string;
    price : string;
}

@Component({
  selector: 'app-product-card-v2',
  imports: [CommonModule],
  templateUrl: './product-card-v2.html',
  styleUrl: './product-card-v2.scss'
})
export class ProductCardV2 {
  shopIconUrl = 'assets/shop.svg';
  heartIconUrl = 'assets/purpleHeart.svg';
  loopIconUrl = 'assets/loop.svg';
  isHovered: boolean = false;
  private productService = inject(ProductService);
  products: Product[] = this.productService.getProducts();

  @Input() ind !: number;

  onHover(hovered : boolean) {
    this.isHovered = hovered;
  }
}
  