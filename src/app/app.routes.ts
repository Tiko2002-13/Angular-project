import { Routes } from '@angular/router';
import { Products } from './products/products';
import { Home } from './home/home';
import { CardPayment } from './card-payment/card-payment';
import { ProductInfo } from './product-info/product-info';

export const routes: Routes = [
  { path: '', component: Home }, // default route
  { path: 'products', component: Products },
  { path: 'products/:name', component: ProductInfo },
  { path: 'payment', component: CardPayment },
  { path: 'shopping', component: ProductInfo },
  { path: '**', redirectTo: '' },
  // wildcard redirect
];
