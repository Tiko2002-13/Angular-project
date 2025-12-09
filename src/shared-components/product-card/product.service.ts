import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Product from '../../app/models/product.interface';
import { PRODUCTS } from '../../app/data/products.data';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = PRODUCTS;
  viewProduct!: Product;

  private boughtProductsSubject = new BehaviorSubject<Product[]>([]);
  boughtProducts$ = this.boughtProductsSubject.asObservable();

  getProducts() {
    return this.products;
  }

  setBoughtProducts(product: Product) {
    const current = this.getboughtProducts();
    const currentProduct = current.find((item) => item.name === product.name);
    if (currentProduct) {
      currentProduct.quantity += 1;
    } else {
      product.quantity = 1;
      current.push(product);
    }

    this.boughtProductsSubject.next([...current]);
  }

  clearBoughtProducts() {
    this.boughtProductsSubject.next([]);
  }

  getboughtProducts() {
    return [...this.boughtProductsSubject.value];
  }

  getSubTotalPrice() {
    return this.boughtProductsSubject.value.reduce((sum, product) => {
      return sum + Number(product.price.slice(1)) * product.quantity;
    }, 0);
  }

  updateBoughtProducs(product: Product, change: number) {
    const current = this.getboughtProducts();
    const currentItem = current.find(item => item.name === product.name);

    if(!currentItem) return;

    currentItem.quantity += change;

    if(currentItem.quantity < 1) {
        const filteredItems = current.filter(item => item.name !== currentItem.name)
        this.boughtProductsSubject.next(filteredItems);
    } else {
        this.boughtProductsSubject.next(current);
    }
  }

  sendProduct(product: Product) {
    this.viewProduct = product;
  }

  hasProduct(product: Product) {
    return this.boughtProductsSubject.value.includes(product);
  }
}
