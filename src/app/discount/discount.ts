import { Component} from '@angular/core';
import { Btn } from "../btn/btn";
import { RouterLink, RouterLinkActive } from '@angular/router';



interface Product {
    name: string;
    imgUrl: string;
    price : string;
}

@Component({
  selector: 'app-discount',
  imports: [Btn, RouterLink, RouterLinkActive],
  templateUrl: './discount.html',
  styleUrl: './discount.scss'
})
export class Discount {
  checkImgUrl = 'assets/check.svg';
  //headphonesUrl = 'assets/discountHeadphones.svg';
  
  product1: Product = {
    name: "headphones",
    imgUrl: 'assets/headphones.png',
    price : '$90.00'
  }
  
  product2: Product = {
    name: "notebook",
    imgUrl: 'assets/notebook.png',
    price : '$430.00'
  }


  products: Product[] = [this.product1,this.product2]
  currentItem : Product = this.products[0];

  onClick(option: string) {
    this.currentItem = option === "headphones" ? this.products[0] : this.products[1];
  }
}
