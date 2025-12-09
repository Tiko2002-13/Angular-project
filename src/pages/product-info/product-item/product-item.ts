import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Stars } from "../../products/stars/stars";
import { Btn } from "../../../shared-components/btn/btn";
import { ProductService } from '../../../shared-components/product-card/product.service';
import Product from '../../../app/models/product.interface';

@Component({
  selector: 'app-product-item',
  imports: [Stars, Btn],
  templateUrl: './product-item.html',
  styleUrl: './product-item.scss'
})
export class ProductItem implements OnChanges {
  private productService = inject(ProductService);
  
  @Input() product!: Product;
  
  heartIconUrl = 'assets/heartBlack.svg';
  hasProducts: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.hasProducts = this.productService.hasProduct(this.product);
    }
  }

  addToCart(product: Product) {
    this.productService.setBoughtProducts(product);
    this.hasProducts = this.productService.hasProduct(this.product);
  }
}
