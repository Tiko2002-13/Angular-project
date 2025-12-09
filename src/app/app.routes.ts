import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('../pages/home/home').then(m => m.Home),
    title: 'Home - My Angular App'
  },
  { 
    path: 'products', 
    loadComponent: () => import('../pages/products/products').then(m => m.Products),
    title: 'Products - My Angular App'
  },
  { 
    path: 'products/:name', 
    loadComponent: () => import('../pages/product-info/product-info').then(m => m.ProductInfo),
    title: 'Product Details - My Angular App'
  },
  { 
    path: 'login', 
    loadComponent: () => import('../pages/login/login').then(m => m.Login),
    title: 'Login - My Angular App'
  },
  { 
    path: 'payment', 
    loadComponent: () => import('../pages/card-payment/card-payment').then(m => m.CardPayment),
    title: 'Payment - My Angular App'
  },
  { 
    path: 'shopping', 
    loadComponent: () => import('../pages/product-info/product-info').then(m => m.ProductInfo),
    title: 'Shopping - My Angular App'
  },
  { 
    path: '**', 
    redirectTo: '' 
  }
];



