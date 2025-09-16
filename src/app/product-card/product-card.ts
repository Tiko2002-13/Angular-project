import { Component,inject,Input} from '@angular/core';
import { Btn } from '../btn/btn';
import { CommonModule } from '@angular/common';
import { ProductService } from './product.service';
import { Router } from '@angular/router';
interface Product {
    name: string;
    imgUrl: string;
    price : string;
    quantity: number;
}

@Component({
  selector: 'app-product-card',
  imports: [Btn,CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss'
})
export class ProductCard {
   private productService  = inject(ProductService);

  shopIconUrl = 'assets/shop.svg';
  heartIconUrl = 'assets/purpleHeart.svg';
  loopIconUrl = 'assets/loop.svg';
  isHovered: boolean = false;
  acitve: boolean = false;
  @Input() ind!: number;
  @Input() hoverDisabled !: boolean;
  @Input() variant !: number;

  constructor(private router: Router) {}


 


  products: Product[] = this.productService.getProducts();
  onHover(isHovered: boolean) {
    this.isHovered = isHovered;
  }

  onAdd(product: Product) {
    this.productService.setBoughtProducts(product);
    this.acitve = !this.acitve;
    console.log(product);
    console.log(this.productService.getboughtProducts())
  }

  onView(product:Product) {
    this.productService.sendProduct(product);
    this.router.navigate(['/products',product.name]);
  }
}


