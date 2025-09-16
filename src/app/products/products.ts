import { Component, inject, Output, EventEmitter } from '@angular/core';
import { Stars } from './stars/stars';
import { Card } from './card/card';
import { CommonModule } from '@angular/common';
import { Footer } from "../footer/footer";
import { CardSerivce } from './card/card.service';
import { RouterLink,RouterLinkActive } from '@angular/router';

interface Product {
    name: string;
    imgUrl: string;
    price: string;
    starCount: number;
    brand: string;
    discount: number;
    type: string;
}


@Component({
  selector: 'app-products',
  imports: [Stars, Card, CommonModule, Footer,RouterLink,RouterLinkActive],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products {
  count : number = 10;
  arrowDownUrl = 'assets/arrow-black.svg';
  sortIcon1 = 'assets/sort1.svg';
  sortIcon2 = 'assets/sort2.svg';
  galchkaUrl = 'assets/Vector.svg';
  activeIndex !: number;
  currentFilter !: string;
  variant : number = 2;
  showCountBar: boolean = false;
  showSortingBar: boolean = false;
  sortOption : string = "default";
  activePage: number = 1;
 
  private cardService = inject(CardSerivce);
  items: Product[] = this.cardService.getProducts();

  onClick(ind: number, filterBy: string) {
    this.activeIndex = this.activeIndex === ind ? -1 : ind;
    this.currentFilter = filterBy;
    if(ind < 6) {
      this.items = this.cardService.getProductsbyBrand(this.currentFilter);
    }
    if(ind >= 6 && ind <= 8) {
      this.items = this.cardService.getProductsbyDiscount(Number(this.currentFilter));
    }
    if(ind >= 9 && ind <= 13) {
      this.items = this.cardService.getProductsbyRating(Number(this.currentFilter));
    }
    if(ind >= 14 && ind <= 20) {
      this.items = this.cardService.getProductsbyType(this.currentFilter);
    }
    if(ind > 20) {
      let prices = this.currentFilter.split("-");
      this.items = this.cardService.getProductsbyPrice(Number(prices[0]),Number(prices[1]));
    }
    if(this.activeIndex === -1) {
      this.count = 10;
      this.activePage = 1;
      this.items = this.cardService.getProducts();
    }
  }
  onVariant(num: number) {
    this.variant = num;
  }

  onShowCountBar() {
    this.showCountBar = !this.showCountBar;
  }
 
  onShowSortingBar() {
    this.showSortingBar = !this.showSortingBar;
  }

  onChooseCount(count: number) {
    this.count = count;
    this.activePage = 1;
    this.items = this.cardService.getProducts().slice(0,count);
    this.showCountBar = false;
  }

  onChooseSort(option: string) {
    this.showSortingBar = !this.showSortingBar;
    this.sortOption = option;
    this.items = this.cardService.getProductsSorted(this.sortOption)
  }

  onChangePage(page: number) {
    this.activePage = page;
    if(this.count === 5) {
      this.items = this.cardService.getProducts().slice((this.activePage - 1) * this.count,this.activePage * this.count)
      console.log(this.items);
    }  else if(this.count === 3) {
        if(this.activePage === 4) {
          this.items = this.cardService.getProducts().slice(9);
        } else {
          this.items = this.cardService.getProducts().slice((this.activePage - 1) * this.count,this.activePage * this.count)
        }
    } 
  }

  @Output() change = new EventEmitter();
  onChange(event: string) {
    this.change.emit(event);
  }
}
