import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Btn } from '../../shared-components/btn/btn';
import Product from '../../app/models/product.interface';



@Component({
  selector: 'app-discount',
  imports: [Btn, RouterLink],
  templateUrl: './discount.html',
  styleUrl: './discount.scss',
})
export class Discount {
  protected checkImgUrl = 'assets/check.svg';
  //headphonesUrl = 'assets/discountHeadphones.svg';
  protected products: Product[] = [
    {
      name: 'headphones',
      imgUrl: 'assets/headphones.png',
      price: '$90.00',
      quantity: 0
    },
    {
      name: 'notebook',
      imgUrl: 'assets/notebook.png',
      price: '$430.00',
      quantity: 0
    },
  ];
  protected currentItem: Product = this.products[0];

  constructor() {}

  protected onClick(option: string) {
    this.currentItem =
      option === 'headphones' ? this.products[0] : this.products[1];
  }
}
