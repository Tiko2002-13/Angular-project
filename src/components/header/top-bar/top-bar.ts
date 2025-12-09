import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { ProductService } from '../../../shared-components/product-card/product.service';
import { AuthService } from '../../../app/services/auth.service';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-top-bar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBar {
  protected productService = inject(ProductService);
  protected authService = inject(AuthService);
  private router = inject(Router);
  
  protected itemCount$: Observable<number> = this.productService.boughtProducts$.pipe(
    map(products => products.length)
  );
  
  protected isLoggedIn$: Observable<boolean> = this.authService.isAuthenticated$;
  protected userEmail$: Observable<string | null> = this.authService.userEmail$;
  
  protected logoUrl = 'assets/Logo.svg';
  protected heartUrl = 'assets/heart.svg';
  protected humanUrl = 'assets/human.svg';
  protected boughtItemUrl = 'assets/boughtItems.svg';

  protected onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
