import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./features/home/home').then(m => m.Home) 
  },
  { 
    path: 'home', 
    loadComponent: () => import('./features/home/home').then(m => m.Home) 
  },
  {
    path: 'products',
    loadComponent: () => import('./features/products/products').then(m => m.Products)
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./features/product-detail/product-detail').then(m => m.ProductDetail)
  },
  {
    path: 'cart',
    loadComponent: () => import('./shared/components/cart/cart.component').then(m => m.CartComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about').then(m => m.About)
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact').then(m => m.Contact)
  },
  {
    path: 'blog',
    loadComponent: () => import('./features/blog/blog').then(m => m.Blog)
  }
];