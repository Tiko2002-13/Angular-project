import { Component } from '@angular/core';
import { ProductItem } from "./product-item/product-item";
import { CommonModule } from '@angular/common';
import { ProductCard } from "../product-card/product-card";
import { Footer } from "../footer/footer";

@Component({
  selector: 'app-product-info',
  imports: [ProductItem, CommonModule, ProductCard, Footer],
  templateUrl: './product-info.html',
  styleUrl: './product-info.scss'
})
export class ProductInfo {
  checkImgUrl = 'assets/check.svg';
  activeLink : number = 1;

  onActivate(index: number) {
    this.activeLink = index;
    console.log(this.activeLink)
  }
}
