import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuOpen = false;

  navItems = [
    { label: 'Accueil', path: '/' },
    { label: 'Visage', path: '/products', queryParams: { category: 'visage' } },
    { label: 'Cheveux', path: '/products', queryParams: { category: 'cheveux' } },
    { label: 'Coffrets', path: '/products', queryParams: { category: 'coffrets' } },
    { label: 'Trousseaux Bébé', path: '/products', queryParams: { category: 'trousseaux-bebe' } },
    { label: 'Produits', path: '/products' },
    { label: 'À propos', path: '/about' }
  ];
}