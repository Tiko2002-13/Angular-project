import {
  Component,
  inject,
  Output,
  EventEmitter,
  HostBinding,
} from '@angular/core';
import { Stars } from './stars/stars';
import { Card } from './card/card';
import { CommonModule } from '@angular/common';

import { CardService } from './card/card.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import Product from '../../app/models/ratedProduct.interface';
import { fadeInAnimation, fadeScaleAnimation } from '../../app/animations/page-animations';

@Component({
  selector: 'app-products',
  imports: [
    Header,
    Stars,
    Card,
    CommonModule,
    Footer,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './products.html',
  styleUrl: './products.scss',
  animations: [fadeInAnimation, fadeScaleAnimation]
})
export class Products {
  private cardService = inject(CardService);
  protected items: Product[] = this.cardService.getProducts();
  @Output() change = new EventEmitter();

  @HostBinding('style.height') hostHeight = '377rem';

  protected count: number = 10;
  protected arrowDownUrl = 'assets/arrow-black.svg';
  protected sortIcon1 = 'assets/sort1.svg';
  protected sortIcon2 = 'assets/sort2.svg';
  protected galchkaUrl = 'assets/Vector.svg';
  protected currentFilter!: string;
  protected variant: number = 2;
  protected showCountBar: boolean = false;
  protected showSortingBar: boolean = false;
  protected sortOption: string = 'default';
  protected activePage: number = 1;

  protected brandFilters: string[] = [];
  protected discountFilters: number[] = [];
  protected ratingFilters: number[] = [];
  protected categoriesFilters: string[] = [];
  protected priceFilters: string[] = [];

  constructor() {}

  protected onSort() {
    this.items = this.cardService.getSortedProducts(
      this.brandFilters,
      this.discountFilters,
      this.ratingFilters,
      this.categoriesFilters,
      this.priceFilters
    );
  }
  
  


  protected onSortByBrand(brandName: string) {
    if (this.brandFilters.includes(brandName)) {
      this.brandFilters = this.brandFilters.filter(
        (brand) => brand !== brandName
      );
    } else {
      this.brandFilters.push(brandName);
    }
    this.onSort();
  }

  protected onSortByDiscount(discount: number) {
    if (this.discountFilters.includes(discount)) {
      this.discountFilters = this.discountFilters.filter(
        (d) => d !== discount  // Fixed: use different variable name
      );
    } else {
      this.discountFilters.push(discount);
    }
    this.onSort();
  }

  protected onSortByRating(rating: number) {
    if (this.ratingFilters.includes(rating)) {
      this.ratingFilters = this.ratingFilters.filter(
        (r) => r !== rating  // Fixed: use different variable name
      );
    } else {
      this.ratingFilters.push(rating);
    }
    this.onSort();
  }

  protected onSortByType(type: string) {
    if (this.categoriesFilters.includes(type)) {
      this.categoriesFilters = this.categoriesFilters.filter(
        (category) => category !== type  // This one was correct
      );
    } else {
      this.categoriesFilters.push(type);
    }
    this.onSort();
  }

  protected onSortByPrice(priceRange: string) {
    if (this.priceFilters.includes(priceRange)) {
      this.priceFilters = this.priceFilters.filter(
        (p) => p !== priceRange  // Fixed: use different variable name
      );
    } else {
      this.priceFilters.push(priceRange);
    }
    this.onSort();
  }

  protected onVariant(num: number) {
    this.variant = num;
  }

  protected onShowCountBar() {
    this.showCountBar = !this.showCountBar;
  }

  protected onShowSortingBar() {
    this.showSortingBar = !this.showSortingBar;
  }

  protected clearFilters() {
    this.brandFilters = [];
    this.discountFilters = [];
    this.ratingFilters = [];
    this.categoriesFilters = [];
    this.priceFilters = [];
  }

  protected onChooseCount(count: number) {
    if (count === 10) {
      this.hostHeight = '377rem';
    } else if (count === 5) {
      this.hostHeight = '237rem';
    } else {
      this.hostHeight = '181rem';
    }
    this.clearFilters();
    this.count = count;
    this.activePage = 1;
    this.items = this.cardService.getProducts().slice(0, count);
    this.showCountBar = !this.showCountBar;
  }

  protected onChooseSort(option: string) {
    this.clearFilters();
    this.showSortingBar = !this.showSortingBar;
    this.sortOption = option;
    this.items = this.cardService.getProductsSorted(this.sortOption);
  }

  protected onChangePage(page: number) {
    this.activePage = page;
    if (this.count === 5) {
      this.items = this.cardService
        .getProducts()
        .slice(
          (this.activePage - 1) * this.count,
          this.activePage * this.count
        );
    } else if (this.count === 3) {
      if (this.activePage === 4) {
        this.items = this.cardService.getProducts().slice(9);
      } else {
        this.items = this.cardService
          .getProducts()
          .slice(
            (this.activePage - 1) * this.count,
            this.activePage * this.count
          );
      }
    }
  }

  protected onChange(event: string) {
    this.change.emit(event);
  }
}
