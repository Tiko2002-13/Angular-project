import { Injectable } from "@angular/core";
import Product from "../../../app/models/ratedProduct.interface";
import { RATED_PRODUCTS } from "../../../app/data/rated-products.data";

@Injectable({providedIn: "root"})

export class CardService {
    products: Product[] = RATED_PRODUCTS;
    
    getProducts() {
        return this.products;
    }

    getProductsbyBrand(brands: string[]) {
        let sortedbyBrand: Product[] = this.getProducts().slice();
        sortedbyBrand = brands.length > 0 
            ? sortedbyBrand.filter(product => brands.includes(product.brand)) 
            : sortedbyBrand;
        return sortedbyBrand;
    }

    getProductsbyDiscount(sortedByBrand: Product[], discounts: number[]) {
        return discounts.length > 0 
            ? sortedByBrand.filter(product => discounts.includes(product.discount)) 
            : sortedByBrand;
    }

    getProductsbyRating(sortedByDiscount: Product[], ratings: number[]) {
        return ratings.length > 0 
            ? sortedByDiscount.filter(product => ratings.includes(product.starCount)) 
            : sortedByDiscount;
    }

    getProductsbyType(sortedByRating: Product[], types: string[]) {
        return types.length > 0 
            ? sortedByRating.filter(product => types.includes(product.type)) 
            : sortedByRating;
    }

    getProductsbyPrice(sortedByType: Product[], prices: string[]) {
        let sortedFinal: Product[] = sortedByType;
        for(const price of prices) {
            let priceString = price.split('-');
            let price1 = Number(priceString[0]);
            let price2 = Number(priceString[1]);
            sortedFinal = sortedFinal.filter(item => Number(item.price.slice(1)) >= price1 && Number(item.price.slice(1)) <= price2);
        }
        
        return sortedFinal;
    }

    getSortedProducts(brands: string[], discounts: number[], ratings: number[], categories: string[], prices: string[]) {
        const sortedByBrand = this.getProductsbyBrand(brands);
        const sortedByDiscount = this.getProductsbyDiscount(sortedByBrand, discounts);
        const sortedByRating = this.getProductsbyRating(sortedByDiscount, ratings);
        const sortedByType = this.getProductsbyType(sortedByRating, categories)
        return this.getProductsbyPrice(sortedByType,prices);
    }

    getProductsSorted(sortBy: string) {
        let sortedProducts;
        if(sortBy === "Descending") {
            sortedProducts = this.products.slice().sort((item1,item2) => {
                return Number(item2.price.slice(1)) - Number(item1.price.slice(1)) 
            })
        } else if(sortBy === "Ascending") {
            sortedProducts = this.products.slice().sort((item1,item2) => {
                return Number(item1.price.slice(1)) - Number(item2.price.slice(1)) 
            })
        } else {
            sortedProducts = this.products.slice().sort((item1,item2) => {
                return item1.starCount - item2.starCount;
            })
        }

        return sortedProducts;
    }
}