import { Component, inject, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Btn } from '../../shared-components/btn/btn';
import { CommonModule } from '@angular/common';
import { ProductService } from './product.service';
import { Router } from '@angular/router';
import Product from '../../app/models/product.interface';

@Component({
  selector: 'app-product-card',
  standalone: true, 
  imports: [Btn, CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCard implements OnInit {
  private productService = inject(ProductService);
  protected products: Product[] = this.productService.getProducts();
  protected activeProducts: Product[] = [];
  @Input() ind!: number;
  @Input() hoverDisabled!: boolean; 
  @Input() variant!: number;

  protected shopIconUrl = 'assets/shopIcon.svg';
  protected heartIconUrl = 'assets/purpleHeart.svg';
  protected loopIconUrl = 'assets/loop.svg';

  protected zoomed: boolean = false;
  protected isHovered: boolean = false;
  protected active: boolean = false;


  constructor(private router: Router) {}

  ngOnInit(): void {
    this.productService.boughtProducts$.subscribe((products: Product[]) => {
      this.active = products.includes(this.products[this.ind]);
    })
  }

  protected onZoom(event?: Event) {
    if (event) {
      event.stopPropagation(); // Prevent navigation
    }
    this.zoomed = true;
  }

  protected onCloseZoom(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.zoomed = false;
  }

  protected onHover(isHovered: boolean) {
    if (!this.zoomed) {
      this.isHovered = isHovered;
    }
  }

  protected onAdd(product: Product, event?: Event) {
    if (event) {
      event.stopPropagation(); 
    }
    this.productService.setBoughtProducts(product);
  }

  protected onView(product: Product, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.productService.sendProduct(product);
    this.router.navigate(['/products', product.name]);
  }
}