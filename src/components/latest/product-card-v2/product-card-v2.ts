import { Component, inject, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../shared-components/product-card/product.service';
import Product from '../../../app/models/product.interface';

@Component({
  selector: 'app-product-card-v2',
  imports: [CommonModule],
  templateUrl: './product-card-v2.html',
  styleUrl: './product-card-v2.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardV2 implements OnInit {
  private productService = inject(ProductService);

  protected readonly products: Product[] = this.productService.getProducts();
 
  protected shopIconUrl = 'assets/shopIcon.svg';
  protected heartIconUrl = 'assets/purpleHeart.svg';
  protected loopIconUrl = 'assets/loop.svg';
  protected isHovered: boolean = false;
  protected zoomed: boolean = false;
  protected active: boolean = false;

  @Input() ind!: number;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.productService.boughtProducts$.subscribe((products: Product[]) => {
      this.active = products.includes(this.products[this.ind]);
    });
  }

  protected onHover(hovered: boolean) {
    if (!this.zoomed) {
      this.isHovered = hovered;
    }
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

  protected onAdd(product: Product, event?: Event) {
    if (event) {
      event.stopPropagation(); // Prevent navigation when adding to cart
    }
    this.productService.setBoughtProducts(product);
  }

  protected onView(product: Product, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.productService.sendProduct({...product, quantity: 0});
    this.router.navigate(['/products', product.name]);
  }
}
