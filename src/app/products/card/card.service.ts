import { Injectable } from "@angular/core";

interface Product {
    name: string;
    imgUrl: string;
    price: string;
    starCount: number;
    brand: string;
    discount: number;
    type: string;
}

@Injectable({providedIn: "root"})

export class CardSerivce {
    products: Product[] = [
    {
        name: "Watches",
        imgUrl: "assets/productCard1.svg",
        price: "$42.00",
        starCount: 1,
        brand: "Casio",
        discount: 20,
        type: "Watches"
    },

    {
        name: "Headphones",
        imgUrl: "assets/productCard2.svg",
        price: "$90.00",
        starCount: 2,
        brand: "Sony",
        discount: 5,
        type: "Headphones"
    },

    {
        name: "Laptop",
        imgUrl: "assets/productCard3.svg",
        price: "$289.00",
        starCount: 3,
        brand: "Apple",
        discount: 25,
        type: "Laptop"
    },

    {
        name: "Black Watches",
        imgUrl: "assets/productCard4.svg",
        price: "$35.00",
        starCount: 1,
        brand: "Casio",
        discount: 20,
        type: "Watches"
    },

    {
        name: "Game Console",
        imgUrl: "assets/productCard5.svg",
        price: "$76.00",
        starCount: 1,
        brand: "Sony",
        discount: 20,
        type: "Game Console"
    },
    {
        name: "Shoes",
        imgUrl: "assets/productCard6.svg",
        price: "$57.00",
        starCount: 1,
        brand: "Nike",
        discount: 25,
        type: "Shoes"
    },
    {
        name: "Perfume",
        imgUrl: "assets/productCard7.svg",
        price: "$19.00",
        starCount: 1,
        brand: "Glossiness",
        discount: 5,
        type: "Perfume"
    },
    {
        name: "Present Box",
        imgUrl: "assets/productCard8.svg",
        price: "$12.00",
        starCount: 1,
        brand: "Vke",
        discount: 5,
        type: "Jewellery"
    },
    {
        name: "Braclet",
        imgUrl: "assets/productCard9.svg",
        price: "$67.00",
        starCount: 4,
        brand: "Vke",
        discount: 20,
        type: "Jewellery"
    },
    {
        name: "Ring",
        imgUrl: "assets/productCard10.svg",
        price: "$56.00",
        starCount: 0,
        brand: "Vke",
        discount: 5,
        type: "Jewellery"
    }


    ]
    
    getProducts() {
        return this.products;
    }

    getProductsbyBrand(brand: string) {
        return this.products.filter(item => item.brand === brand);
    }

    getProductsbyDiscount(price: number) {
        return this.products.filter(item => item.discount === price);
    }

    getProductsbyRating(rating: number) {
        return this.products.filter(item => item.starCount === rating);
    }

    getProductsbyType(type: string) {
        return this.products.filter(item => item.type === type);
    }

    getProductsbyPrice(price1: number,price2: number) {
         return this.products.filter(item => Number(item.price.slice(1)) >= price1 && Number(item.price.slice(1)) <= price2);
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