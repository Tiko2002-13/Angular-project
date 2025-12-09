import { Component, OnInit } from '@angular/core';
import { ProductItem } from "./product-item/product-item";
import { CommonModule } from '@angular/common';
import { ProductCard } from '../../shared-components/product-card/product-card';
import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { ProductService } from '../../shared-components/product-card/product.service';
import { ActivatedRoute } from '@angular/router';
import Product from '../../app/models/product.interface';
import { fadeInAnimation } from '../../app/animations/page-animations';

@Component({
  selector: 'app-product-info',
  imports: [Header, ProductItem, CommonModule, ProductCard, Footer],
  templateUrl: './product-info.html',
  styleUrl: './product-info.scss',
  animations: [fadeInAnimation]
})
export class ProductInfo implements OnInit {
  protected checkImgUrl = 'assets/check.svg';
  protected activeLink: number = 1;
  protected currentProduct: Product | null = null;
  protected relatedProducts: Product[] = [];
  protected relatedProductIndices: number[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productName = params.get('name');
      this.loadProduct(productName);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  private loadProduct(productName: string | null): void {
    const products = this.productService.getProducts();
    
    if (productName) {
      if (this.productService.viewProduct && this.productService.viewProduct.name === productName) {
        this.currentProduct = this.productService.viewProduct;
      } else {
        const foundProduct = products.find(p => p.name === productName);
        
        if (foundProduct) {
          this.currentProduct = foundProduct;
          this.productService.sendProduct(foundProduct);
        } else {
          if (this.productService.viewProduct) {
            this.currentProduct = this.productService.viewProduct;
          } else {
            this.setDefaultProduct(products);
          }
        }
      }
    } else {
      if (this.productService.viewProduct) {
        this.currentProduct = this.productService.viewProduct;
      } else {
        this.setDefaultProduct(products);
      }
    }

    this.setRelatedProducts(products);
  }

  private setDefaultProduct(products: Product[]): void {
    if (products.length > 0) {
      this.currentProduct = products[0];
      this.productService.sendProduct(products[0]);
    }
  }

  private setRelatedProducts(allProducts: Product[]): void {
    this.relatedProducts = allProducts
      .filter(p => p.name !== this.currentProduct?.name)
      .slice(0, 4);
    
    this.relatedProductIndices = this.relatedProducts.map(product => 
      allProducts.findIndex(p => p.name === product.name)
    );
  }

  protected onActivate(index: number): void {
    this.activeLink = index;
  }
}
