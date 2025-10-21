import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from '../../../shared/components/search-bar/search-bar.component';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchBarComponent, ProductCardComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  menuOpen = false;
  isSearchOpen = false; // overlay state

  navItems = [
    { label: 'Accueil', path: '/' },
    { label: 'Produits', path: '/products' },
    { label: 'Catégories', path: '/products', queryParams: { category: 'all' } },
    { label: 'Nouveautés', path: '/products', queryParams: { new: 'true' } },
    { label: 'Promotions', path: '/products', queryParams: { sale: 'true' } }
  ];

  // Popular searches (clickable shortcuts)
  popularSearches: string[] = [
    'svr', 'avene', 'bioderma', 'eucerin', 'acm', 'uriage', 'isdin', 'cerave', 'la roche posay', 'mustela',
    'vichy', 'ducray', 'noreva', 'galenic', 'filorga', 'la roche', 'eau thermale', 'solaire', 'anti-âge',
    'nettoyant', 'hydratant', 'anti-acné', 'serum', 'gel moussant', 'lotion', 'tonique', 'masque', 'peaux sensibles',
    'shampooing', 'après-shampooing', 'anti-chute', 'solaire visage', 'solaire corps'
  ];

  // Minimal product shape for the overlay cards
  recommendedProducts = [
    {
      id: 'p1',
      name: 'ACM Azéane Crème Acide Azélaïque 15% 30ml',
      category: 'Soins visage',
      price: 71.97,
      originalPrice: 78.97,
      discount: 10,
      isNew: false,
      rating: 4.5,
      reviewCount: 120,
      imageUrl: 'https://placehold.co/300x300?text=ACM+Az%C3%A9ane'
    },
    {
      id: 'p2',
      name: 'SVR Topialyse Gel Lavant Flacon Pompe',
      category: 'Soins corps',
      price: 35.67,
      originalPrice: 44.59,
      discount: 20,
      isNew: false,
      rating: 4.6,
      reviewCount: 98,
      imageUrl: 'https://placehold.co/300x300?text=SVR+Topialyse'
    },
    {
      id: 'p3',
      name: 'SVR Sebiaclear Gel Moussant 400ml',
      category: 'Nettoyants',
      price: 45.15,
      originalPrice: 56.44,
      discount: 20,
      isNew: false,
      rating: 4.4,
      reviewCount: 72,
      imageUrl: 'https://placehold.co/300x300?text=SVR+Sebiaclear'
    },
    {
      id: 'p4',
      name: 'Phytéal Déodorant Anti Transpirant 50ml',
      category: 'Hygiène',
      price: 23.31,
      originalPrice: null,
      discount: null,
      isNew: false,
      rating: 4.2,
      reviewCount: 51,
      imageUrl: 'https://placehold.co/300x300?text=Phyt%C3%A9al+Deo'
    },
    {
      id: 'p5',
      name: 'Avène Crème Hydratante 50ml',
      category: 'Soins visage',
      price: 15.99,
      originalPrice: 19.99,
      discount: 20,
      isNew: true,
      rating: 4.7,
      reviewCount: 203,
      imageUrl: 'https://placehold.co/300x300?text=Avène+Crème'
    },
    {
      id: 'p6',
      name: 'Bioderma Sensibio H2O 500ml',
      category: 'Démaquillants',
      price: 28.50,
      originalPrice: null,
      discount: null,
      isNew: false,
      rating: 4.8,
      reviewCount: 456,
      imageUrl: 'https://placehold.co/300x300?text=Bioderma+H2O'
    },
    {
      id: 'p7',
      name: 'Eucerin Hyaluron-Filler Jour 50ml',
      category: 'Anti-âge',
      price: 89.90,
      originalPrice: 99.90,
      discount: 10,
      isNew: false,
      rating: 4.3,
      reviewCount: 88,
      imageUrl: 'https://placehold.co/300x300?text=Eucerin+Hyaluron'
    },
    {
      id: 'p8',
      name: 'Isdin Fotoprotector Fusion Water SPF50',
      category: 'Solaire',
      price: 59.00,
      originalPrice: 69.00,
      discount: 14,
      isNew: false,
      rating: 4.6,
      reviewCount: 312,
      imageUrl: 'https://placehold.co/300x300?text=Isdin+Fusion+Water'
    },
    {
      id: 'p9',
      name: 'Uriage Eau Thermale Crème Légère',
      category: 'Hydratants',
      price: 39.50,
      originalPrice: 45.00,
      discount: 12,
      isNew: false,
      rating: 4.4,
      reviewCount: 147,
      imageUrl: 'https://placehold.co/300x300?text=Uriage+Cr%C3%A8me'
    },
    {
      id: 'p10',
      name: 'CeraVe Gel Moussant 236ml',
      category: 'Nettoyants',
      price: 25.90,
      originalPrice: 29.90,
      discount: 13,
      isNew: true,
      rating: 4.5,
      reviewCount: 221,
      imageUrl: 'https://placehold.co/300x300?text=CeraVe+Gel'
    },
    {
      id: 'p11',
      name: 'Ducray Anaphase+ Shampooing 200ml',
      category: 'Cheveux',
      price: 34.90,
      originalPrice: null,
      discount: null,
      isNew: false,
      rating: 4.1,
      reviewCount: 64,
      imageUrl: 'https://placehold.co/300x300?text=Ducray+Anaphase+'
    },
    {
      id: 'p12',
      name: 'Filorga Time-Filler 50ml',
      category: 'Anti-âge',
      price: 149.00,
      originalPrice: 169.00,
      discount: 12,
      isNew: false,
      rating: 4.7,
      reviewCount: 402,
      imageUrl: 'https://placehold.co/300x300?text=Filorga+Time-Filler'
    }
  ];

  @ViewChild('overlayCarousel') overlayCarousel!: ElementRef<HTMLDivElement>;
  private scrollPosition = 0;

  constructor(private router: Router) {}

  onSearch(searchTerm: string): void {
    if (searchTerm.trim()) {
      this.router.navigate(['/products'], {
        queryParams: { search: searchTerm.trim() }
      });
      this.menuOpen = false;
      this.closeOverlay();
    }
  }

  onSearchFocus(): void {
    this.isSearchOpen = true;
    this.disableBodyScroll();
  }

  onSearchBlur(): void {
    // Small delay allows click interactions inside overlay
    setTimeout(() => {
      if (!document.activeElement || !(document.activeElement as HTMLElement).closest('.search-overlay')) {
        // Do not close automatically; overlay has explicit close
      }
    }, 150);
  }

  closeOverlay(): void {
    this.isSearchOpen = false;
    this.enableBodyScroll();
  }

  applyQuickSearch(term: string): void {
    this.onSearch(term);
  }

  scrollCarousel(direction: 'left' | 'right'): void {
    if (!this.overlayCarousel) return;
    const el = this.overlayCarousel.nativeElement;
    const delta = direction === 'left' ? -320 : 320;
    el.scrollBy({ left: delta, behavior: 'smooth' });
  }

  // Handle ESC key to close overlay
  @HostListener('document:keydown', ['$event'])
  handleEscapeKey(event: KeyboardEvent): void {
    if (this.isSearchOpen && event.key === 'Escape') {
      this.closeOverlay();
    }
  }

  private disableBodyScroll(): void {
    this.scrollPosition = window.pageYOffset;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${this.scrollPosition}px`;
    document.body.style.width = '100%';
  }

  private enableBodyScroll(): void {
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('position');
    document.body.style.removeProperty('top');
    document.body.style.removeProperty('width');
    window.scrollTo(0, this.scrollPosition);
  }

  // Cleanup on destroy
  ngOnDestroy(): void {
    this.enableBodyScroll();
  }
}