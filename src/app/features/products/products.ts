import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './products.html',
  styleUrls: ['./products.scss']
})
export class Products implements OnInit {
  constructor(private cartService: CartService) {}

  products = [
    {
      id: 'p1',
      name: 'Crème Hydratante',
      category: 'Soins de la peau',
      price: 39.9,
      originalPrice: 49.9,
      discount: 20,
      isNew: false,
      imageUrl: 'https://placehold.co/600x600?text=Cr%C3%A8me+Hydratante'
    },
    {
      id: 'p2',
      name: 'Sérum Vitamine C',
      category: 'Soins de la peau',
      price: 59.9,
      originalPrice: null,
      discount: null,
      isNew: true,
      imageUrl: 'https://placehold.co/600x600?text=S%C3%A9rum+Vitamine+C'
    },
    {
      id: 'p3',
      name: 'Shampooing Doux',
      category: 'Cheveux',
      price: 24.9,
      originalPrice: null,
      discount: null,
      isNew: false,
      imageUrl: 'https://placehold.co/600x600?text=Shampooing+Doux'
    },
    {
      id: 'p4',
      name: 'Gel Nettoyant',
      category: 'Soins de la peau',
      price: 29.9,
      originalPrice: null,
      discount: null,
      isNew: true,
      imageUrl: 'https://placehold.co/600x600?text=Gel+Nettoyant'
    },
    {
      id: 'p5',
      name: 'Crème Solaire SPF50',
      category: 'Soins de la peau',
      price: 34.9,
      originalPrice: null,
      discount: 15,
      isNew: false,
      imageUrl: 'https://placehold.co/600x600?text=Cr%C3%A8me+Solaire+SPF50'
    },
    {
      id: 'p6',
      name: 'Après-Shampooing Nourrissant',
      category: 'Cheveux',
      price: 27.9,
      originalPrice: null,
      discount: null,
      isNew: false,
      imageUrl: 'https://placehold.co/600x600?text=Apr%C3%A8s-Shampooing'
    },
    {
      id: 'p7',
      name: 'Brosse à Dents',
      category: 'Hygiène',
      price: 12.9,
      originalPrice: null,
      discount: null,
      isNew: false,
      imageUrl: 'https://placehold.co/600x600?text=Brosse+%C3%A0+Dents'
    },
    {
      id: 'p8',
      name: 'Dentifrice Blanchissant',
      category: 'Hygiène',
      price: 19.9,
      originalPrice: 24.9,
      discount: 20,
      isNew: false,
      imageUrl: 'https://placehold.co/600x600?text=Dentifrice+Blanchissant'
    }
  ];

  categories: string[] = [];
  selectedCategory: string = 'all';
  searchTerm: string = '';
  sortKey: string = 'relevance';

  filteredProducts = [...this.products];

  ngOnInit(): void {
    this.categories = Array.from(new Set(this.products.map(p => p.category)));
    this.applyFilters();
  }

  onAddToCart(product: any): void {
    this.cartService.addToCart(product);
  }

  applyFilters(): void {
    let list = [...this.products];

    if (this.selectedCategory !== 'all') {
      list = list.filter(p => p.category === this.selectedCategory);
    }

    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term));
    }

    switch (this.sortKey) {
      case 'priceLow':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        list.sort((a, b) => Number(b.isNew) - Number(a.isNew));
        break;
      default:
        // relevance (no-op for now)
        break;
    }

    this.filteredProducts = list;
  }
}