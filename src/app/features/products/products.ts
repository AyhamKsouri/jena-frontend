import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { CartService } from '../../core/services/cart.service';
import { ActivatedRoute } from '@angular/router';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number | null;
  discount: number | null;
  isNew: boolean;
  imageUrl: string;
  isPopular?: boolean;
  rating?: number;
  reviewCount?: number;
}

interface Category {
  name: string;
  count: number;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent],
  templateUrl: './products.html',
  styleUrls: ['./products.scss']
})
export class Products implements OnInit {
  constructor(private cartService: CartService, private route: ActivatedRoute) {}

  // Enhanced product data with more categories and properties
  products: Product[] = [
    {
      id: 'p1',
      name: 'Crème Hydratante Visage',
      category: 'Soins Visage',
      price: 39.9,
      originalPrice: 49.9,
      discount: 20,
      isNew: false,
      isPopular: true,
      rating: 4.5,
      reviewCount: 128,
      imageUrl: 'https://placehold.co/600x600?text=Crème+Visage'
    },
    {
      id: 'p2',
      name: 'Sérum Vitamine C Anti-Âge',
      category: 'Soins Visage',
      price: 59.9,
      originalPrice: null,
      discount: null,
      isNew: true,
      isPopular: false,
      rating: 4.8,
      reviewCount: 128,
      imageUrl: 'https://placehold.co/600x600?text=Sérum+Vitamine+C'
    },
    {
      id: 'p3',
      name: 'Shampooing Doux Réparateur',
      category: 'Soins Cheveux',
      price: 24.9,
      originalPrice: null,
      discount: null,
      isNew: false,
      isPopular: true,
      rating: 4.3,
      reviewCount: 128,
      imageUrl: 'https://placehold.co/600x600?text=Shampooing+Doux'
    },
    {
      id: 'p4',
      name: 'Gel Nettoyant Purifiant',
      category: 'Soins Visage',
      price: 29.9,
      originalPrice: null,
      discount: null,
      isNew: true,
      isPopular: false,
      rating: 4.6,
      reviewCount: 128,
      imageUrl: 'https://placehold.co/600x600?text=Gel+Nettoyant'
    },
    {
      id: 'p5',
      name: 'Crème Solaire SPF50+',
      category: 'Protection Solaire',
      price: 34.9,
      originalPrice: 39.9,
      discount: 15,
      isNew: false,
      isPopular: true,
      rating: 4.7,
      reviewCount: 128,
      imageUrl: 'https://placehold.co/600x600?text=Crème+Solaire'
    },
    {
      id: 'p6',
      name: 'Après-Shampooing Nourrissant',
      category: 'Soins Cheveux',
      price: 27.9,
      originalPrice: null,
      discount: null,
      isNew: false,
      isPopular: false,
      rating: 4.2,
      reviewCount: 128,
      imageUrl: 'https://placehold.co/600x600?text=Après-Shampooing'
    },
    {
      id: 'p7',
      name: 'Brosse à Dents Électrique',
      category: 'Hygiène Bucco-Dentaire',
      price: 89.9,
      originalPrice: 99.9,
      discount: 10,
      isNew: false,
      isPopular: true,
      rating: 4.9,
      reviewCount: 128,
      imageUrl: 'https://placehold.co/600x600?text=Brosse+Électrique'
    },
    {
      id: 'p8',
      name: 'Dentifrice Blanchissant',
      category: 'Hygiène Bucco-Dentaire',
      price: 19.9,
      originalPrice: 24.9,
      discount: 20,
      isNew: false,
      isPopular: false,
      rating: 4.4,
      reviewCount: 128,
      imageUrl: 'https://placehold.co/600x600?text=Dentifrice+Blanchissant'
    },
    {
      id: 'p9',
      name: 'Huile Essentielle Lavande',
      category: 'Aromathérapie',
      price: 14.9,
      originalPrice: null,
      discount: null,
      isNew: true,
      isPopular: false,
      rating: 4.1,
      reviewCount: 128,
      imageUrl: 'https://placehold.co/600x600?text=Huile+Lavande'
    },
    {
      id: 'p10',
      name: 'Complément Vitamines B',
      category: 'Compléments Alimentaires',
      price: 45.9,
      originalPrice: null,
      discount: null,
      isNew: false,
      isPopular: true,
      rating: 4.6,
      reviewCount: 128,
      imageUrl: 'https://placehold.co/600x600?text=Vitamines+B'
    },
    {
      id: 'p11',
      name: 'Crème Mains Hydratante',
      category: 'Soins Corps',
      price: 18.9,
      originalPrice: 22.9,
      discount: 17,
      isNew: false,
      isPopular: false,
      rating: 4.3,
      reviewCount: 128,
      imageUrl: 'https://placehold.co/600x600?text=Crème+Mains'
    },
    {
      id: 'p12',
      name: 'Spray Anti-Moustiques',
      category: 'Protection',
      price: 22.9,
      originalPrice: null,
      discount: null,
      isNew: true,
      isPopular: false,
      rating: 4.0,
      reviewCount: 128,
      imageUrl: 'https://placehold.co/600x600?text=Anti-Moustiques'
    }
  ];

  // Filter and pagination properties
  categories: string[] = [];
  allCategories: Category[] = [];
  mainCategories: string[] = [];
  selectedCategory: string = 'all';
  selectedCategories: string[] = [];
  searchTerm: string = '';
  sortKey: string = 'relevance';
  itemsPerPage: number = 12;
  currentPage: number = 1;
  showAdvancedFilters: boolean = false;

  filteredProducts: Product[] = [];
  currentPageProducts: Product[] = [];

  ngOnInit(): void {
    this.initializeCategories();

    // Apply filters from query params (e.g., category=visage)
    this.route.queryParamMap.subscribe(params => {
      const key = params.get('category');
      const mapped = this.mapCategoryKey(key);
      if (mapped) {
        this.selectedCategory = mapped;
      } else {
        this.selectedCategory = 'all';
      }
      this.applyFilters();
    });
  }

  private mapCategoryKey(key: string | null): string | null {
    if (!key) return null;
    const map: Record<string, string> = {
      visage: 'Soins Visage',
      cheveux: 'Soins Cheveux',
      coffrets: 'Compléments Alimentaires',
      'trousseaux-bebe': 'Hygiène Bucco-Dentaire'
    };
    const value = map[key.toLowerCase()] || null;
    return value && this.categories.includes(value) ? value : value;
  }

  private initializeCategories(): void {
    // Get all unique categories
    const uniqueCategories = Array.from(new Set(this.products.map(p => p.category)));
    
    // Create category objects with counts
    this.allCategories = uniqueCategories.map(category => ({
      name: category,
      count: this.products.filter(p => p.category === category).length
    }));

    // Main categories (you can define which ones are main)
    this.mainCategories = ['Soins Visage', 'Soins Cheveux', 'Hygiène Bucco-Dentaire', 'Compléments Alimentaires'];
    
    // All categories for display
    this.categories = uniqueCategories;
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart(product);
    // Optional: Show toast notification
  }

  applyFilters(): void {
    let list = [...this.products];

    // Category filter (main category)
    if (this.selectedCategory !== 'all') {
      list = list.filter(p => p.category === this.selectedCategory);
    }

    // Advanced category filters
    if (this.selectedCategories.length > 0) {
      list = list.filter(p => this.selectedCategories.includes(p.category));
    }

    // Search filter
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase();
      list = list.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.category.toLowerCase().includes(term)
      );
    }

    // Sort products
    this.sortProducts(list);

    this.filteredProducts = list;
    this.currentPage = 1; // Reset to first page when filters change
    this.updateCurrentPageProducts();
  }

  private sortProducts(list: Product[]): void {
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
      case 'popular':
        list.sort((a, b) => {
          const aPopular = a.isPopular ? 1 : 0;
          const bPopular = b.isPopular ? 1 : 0;
          const aRating = a.rating || 0;
          const bRating = b.rating || 0;
          return (bPopular + bRating) - (aPopular + aRating);
        });
        break;
      default:
        // relevance - sort by popularity and rating
        list.sort((a, b) => {
          const aScore = (a.isPopular ? 2 : 0) + (a.rating || 0);
          const bScore = (b.isPopular ? 2 : 0) + (b.rating || 0);
          return bScore - aScore;
        });
        break;
    }
  }

  // Advanced category filtering
  toggleCategory(categoryName: string): void {
    const index = this.selectedCategories.indexOf(categoryName);
    if (index > -1) {
      this.selectedCategories.splice(index, 1);
    } else {
      this.selectedCategories.push(categoryName);
    }
    this.applyFilters();
  }

  isCategoryActive(categoryName: string): boolean {
    return this.selectedCategories.includes(categoryName);
  }

  // Pagination methods
  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage);
  }

  getPages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const total = this.totalPages;
    const current = this.currentPage;
    
    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      
      if (current > 3) {
        pages.push('...');
      }
      
      const start = Math.max(2, current - 1);
      const end = Math.min(total - 1, current + 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (current < total - 2) {
        pages.push('...');
      }
      
      pages.push(total);
    }
    
    return pages;
  }

  changePage(page: number | string): void {
    if (typeof page === 'number' && page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateCurrentPageProducts();
    }
  }

  private updateCurrentPageProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.currentPageProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  // Reset all filters
  resetFilters(): void {
    this.selectedCategory = 'all';
    this.selectedCategories = [];
    this.searchTerm = '';
    this.sortKey = 'relevance';
    this.currentPage = 1;
    this.applyFilters();
  }

  // Get display text for items per page
  get itemsDisplayText(): string {
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(this.currentPage * this.itemsPerPage, this.filteredProducts.length);
    return `${start}-${end} sur ${this.filteredProducts.length}`;
  }
}