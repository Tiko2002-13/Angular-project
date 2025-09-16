import { Component, inject, OnInit } from '@angular/core';
import { Stars } from "../../products/stars/stars";
import { Btn } from "../../btn/btn";
import { ProductService } from '../../product-card/product.service';

interface Product {
    name: string;
    imgUrl: string;
    price : string;
    quantity : number;
}

@Component({
  selector: 'app-product-item',
  imports: [Stars, Btn],
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss'
})
export class ProductItem  {
  private productService = inject(ProductService);
  product = this.productService.viewProduct;
  heartIconUrl = 'assets/heartBlack.svg';
  hasProducts: boolean = this.productService.hasProduct(this.product);

  addToCart(product: Product) {
    this.productService.setBoughtProducts(product);
    this.hasProducts = this.productService.hasProduct(this.product);
  }


}
