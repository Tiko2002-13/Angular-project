import {Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

interface Product {
    name: string;
    imgUrl: string;
    price : string;
    quantity : number;
}

@Injectable({providedIn: 'root'})

export class ProductService  {
    product1 : Product = {
        name: 'Headphones',
        imgUrl: 'assets/product1.svg',
        price: "$90.00",
        quantity: 0
    }
    product2 : Product = {
        name: 'Watch',
        imgUrl: 'assets/product2.svg',
        price: "$34.00",
        quantity: 0,
    }
    product3 : Product = {
        name: 'Notebook',
        imgUrl: 'assets/product3.svg',
        price: "$430.00",
        quantity: 0
    }
    product4 : Product = {
        name: 'Modern Watch',
        imgUrl: 'assets/product4.svg',
        price: "$74.00",
        quantity: 0
    }
    product5 : Product = {
        name: 'Game Console',
        imgUrl: 'assets/product5.svg',
        price: "$390.00",
        quantity: 0
    }
    product6 : Product = {
        name: 'Shoes',
        imgUrl: 'assets/product6.svg',
        price: "$40.00",
        quantity: 0
    }
    product7 : Product = {
        name: 'Perfume',
        imgUrl: 'assets/product7.svg',
        price: "$60.00",
        quantity: 0
    }
    product8 : Product = {
        name:  'Present Box',
        imgUrl: 'assets/product8.svg',
        price: "$90.00",
        quantity: 0
    }
    product9 : Product = {
        name: 'Watches',
        imgUrl: 'assets/product9.svg',
        price: "$56.00",
        quantity: 0
    }
    product10 : Product = {
        name: 'Ring',
        imgUrl: 'assets/product10.svg',
        price: "$190.00",
        quantity: 0
    }
    viewProduct !: Product;
    private products: Product[] = [this.product1,this.product2,this.product3,this.product4,this.product5,this.product6,this.product7,this.product8,this.product9,this.product10];
    private boughtProducts: Product[] = []

    private boughtProductsSubject = new BehaviorSubject<Product[]>([]);
    boughtProducts$ = this.boughtProductsSubject.asObservable();

    getProducts() {
        return this.products;
    }

    setBoughtProducts(product: Product) {
    const current = this.boughtProductsSubject.value;

    if (current.includes(product)) {
      product.quantity += 1;
    } else {
      product.quantity = 1;
      current.push(product);
    }

    this.boughtProductsSubject.next([...current]); // 🔑 notify subscribers
  }


    getboughtProducts() {
        return this.boughtProductsSubject.value;
    }

    getSubTotalPrice() {
        return this.boughtProductsSubject.value.reduce((sum, product) => {
            return sum + Number(product.price.slice(1)) * product.quantity;
        }, 0);
    }

    updateBoughtProducs(product: Product) {
        this.boughtProducts = this.boughtProducts.filter((item) => item !== product);
    }

    sendProduct(product: Product) {
        this.viewProduct = product;
    }

    hasProduct(product: Product) {
        return this.boughtProductsSubject.value.includes(product);
    }
}