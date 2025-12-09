import { Component,inject,Input} from '@angular/core';
import { Stars } from "../stars/stars";
import { ProductService } from '../../../shared-components/product-card/product.service';
import { Router } from '@angular/router';
import Product from '../../../app/models/ratedProduct.interface';




@Component({
  selector: 'app-card',
  imports: [Stars],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card  {
  @Input() ind !: number;
  @Input() products !: Product[];
  @Input() isGrid : boolean = false;
  protected shopImgUrl = 'assets/shopIcon.svg';
  protected heartImgUrl = "assets/heartIcon.svg";
  protected zoomImgUrl = "assets/zoomIcon.svg";
  private productService = inject(ProductService);


  constructor(private router: Router) {};


  protected onBuy(product: Product) {
    const {name,imgUrl,price} = product;
    this.productService.sendProduct({name,imgUrl,price, quantity: 0});
    this.router.navigate(['/products', product.name]);
  }
}
