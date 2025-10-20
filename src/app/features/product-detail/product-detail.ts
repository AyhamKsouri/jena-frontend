import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number | null;
  discount: number | null;
  isNew: boolean;
  imageUrl: string;
  description: string;
  features: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  sku: string;
  brand: string;
}

interface StarRating {
  fullStars: number[];
  hasHalfStar: boolean;
  emptyStars: number[];
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.scss']
})
export class ProductDetail implements OnInit {
  id: string = '';
  quantity: number = 1;
  product: Product | null = null;
  
  // Sample product data - in real app, this would come from a service
  private products: Product[] = [
    {
      id: 'p1',
      name: 'Crème Hydratante',
      category: 'Soins de la peau',
      price: 39.9,
      originalPrice: 49.9,
      discount: 20,
      isNew: false,
      imageUrl: 'https://placehold.co/800x800/4F46E5/FFFFFF?text=Cr%C3%A8me+Hydratante',
      description: "Crème hydratante nourrissante pour une peau douce et protégée toute la journée.",
      features: [
        'Hydratation 24h',
        'Convient aux peaux sensibles',
        'Sans parabènes',
        'Formule légère'
      ],
      rating: 4.5,
      reviewCount: 128,
      inStock: true,
      sku: 'P1-CH-2024',
      brand: 'JENA Care'
    },
    {
      id: 'p2',
      name: 'Sérum Vitamine C',
      category: 'Soins de la peau',
      price: 59.9,
      originalPrice: null,
      discount: null,
      isNew: true,
      imageUrl: 'https://placehold.co/800x800/EC4899/FFFFFF?text=S%C3%A9rum+Vitamine+C',
      description: "Sérum concentré en vitamine C pour une peau radieuse et uniforme.",
      features: [
        'Riche en vitamine C',
        'Antioxydants puissants',
        'Absorption rapide',
        'Texture légère'
      ],
      rating: 4.8,
      reviewCount: 89,
      inStock: true,
      sku: 'P2-SVC-2024',
      brand: 'JENA Premium'
    },
    {
      id: 'p3',
      name: 'Shampooing Doux',
      category: 'Cheveux',
      price: 24.9,
      originalPrice: null,
      discount: null,
      isNew: false,
      imageUrl: 'https://placehold.co/800x800/10B981/FFFFFF?text=Shampooing+Doux',
      description: "Shampooing doux pour un nettoyage efficace sans agresser le cuir chevelu.",
      features: ['Sans sulfates', 'Usage quotidien', 'Brillance naturelle'],
      rating: 4.2,
      reviewCount: 56,
      inStock: true,
      sku: 'P3-SD-2024',
      brand: 'JENA Hair'
    },
    {
      id: 'p4',
      name: 'Gel Nettoyant',
      category: 'Soins de la peau',
      price: 29.9,
      originalPrice: null,
      discount: null,
      isNew: true,
      imageUrl: 'https://placehold.co/800x800/3B82F6/FFFFFF?text=Gel+Nettoyant',
      description: "Gel nettoyant purifiant pour éliminer les impuretés et l'excès de sébum.",
      features: ['Purifie en profondeur', 'Non desséchant', 'Convient aux peaux mixtes'],
      rating: 4.4,
      reviewCount: 72,
      inStock: true,
      sku: 'P4-GN-2024',
      brand: 'JENA Care'
    },
    {
      id: 'p5',
      name: 'Crème Solaire SPF50',
      category: 'Soins de la peau',
      price: 34.9,
      originalPrice: null,
      discount: 15,
      isNew: false,
      imageUrl: 'https://placehold.co/800x800/F59E0B/FFFFFF?text=Cr%C3%A8me+Solaire+SPF50',
      description: "Crème solaire haute protection contre les UVA/UVB pour tous les types de peau.",
      features: ['SPF50', 'Résistante à l\'eau', 'Non grasse'],
      rating: 4.6,
      reviewCount: 102,
      inStock: true,
      sku: 'P5-CS50-2024',
      brand: 'JENA Sun'
    },
    {
      id: 'p6',
      name: 'Après-Shampooing Nourrissant',
      category: 'Cheveux',
      price: 27.9,
      originalPrice: null,
      discount: null,
      isNew: false,
      imageUrl: 'https://placehold.co/800x800/8B5CF6/FFFFFF?text=Apr%C3%A8s-Shampooing',
      description: "Après-shampooing nourrissant pour des cheveux doux, brillants et démêlés.",
      features: ['Nourrit en profondeur', 'Démêle', 'Cheveux soyeux'],
      rating: 4.3,
      reviewCount: 64,
      inStock: true,
      sku: 'P6-ASN-2024',
      brand: 'JENA Hair'
    },
    {
      id: 'p7',
      name: 'Brosse à Dents',
      category: 'Hygiène',
      price: 12.9,
      originalPrice: null,
      discount: null,
      isNew: false,
      imageUrl: 'https://placehold.co/800x800/6366F1/FFFFFF?text=Brosse+%C3%A0+Dents',
      description: "Brosse à dents souple pour un nettoyage efficace tout en douceur.",
      features: ['Poils souples', 'Manche ergonomique', 'Protection des gencives'],
      rating: 4.1,
      reviewCount: 35,
      inStock: true,
      sku: 'P7-BAD-2024',
      brand: 'JENA Hygiene'
    },
    {
      id: 'p8',
      name: 'Dentifrice Blanchissant',
      category: 'Hygiène',
      price: 19.9,
      originalPrice: 24.9,
      discount: 20,
      isNew: false,
      imageUrl: 'https://placehold.co/800x800/EF4444/FFFFFF?text=Dentifrice+Blanchissant',
      description: "Dentifrice blanchissant pour des dents plus blanches et une haleine fraîche.",
      features: ['Anti-taches', 'Hydrate l\'émail', 'Goût mentholé'],
      rating: 4.0,
      reviewCount: 41,
      inStock: true,
      sku: 'P8-DB-2024',
      brand: 'JENA Hygiene'
    },
    {
      id: 'p9',
      name: 'Huile Essentielle Lavande',
      category: 'Aromathérapie',
      price: 14.9,
      originalPrice: null,
      discount: null,
      isNew: true,
      imageUrl: 'https://placehold.co/800x800/7C3AED/FFFFFF?text=Huile+Lavande',
      description: "Huile essentielle de lavande apaisante pour le bien-être quotidien.",
      features: ['Relaxante', '100% pure', 'Usage diffusion ou topique'],
      rating: 4.1,
      reviewCount: 27,
      inStock: true,
      sku: 'P9-HEL-2024',
      brand: 'JENA Nature'
    },
    {
      id: 'p10',
      name: 'Complément Vitamines B',
      category: 'Compléments Alimentaires',
      price: 45.9,
      originalPrice: null,
      discount: null,
      isNew: false,
      imageUrl: 'https://placehold.co/800x800/F43F5E/FFFFFF?text=Vitamines+B',
      description: "Complexe de vitamines B pour l'énergie et le métabolisme.",
      features: ['B1-B12 complètes', 'Vegan', 'Libération prolongée'],
      rating: 4.6,
      reviewCount: 53,
      inStock: true,
      sku: 'P10-VITB-2024',
      brand: 'JENA Health'
    },
    {
      id: 'p11',
      name: 'Crème Mains Hydratante',
      category: 'Soins Corps',
      price: 18.9,
      originalPrice: 22.9,
      discount: 17,
      isNew: false,
      imageUrl: 'https://placehold.co/800x800/FB7185/FFFFFF?text=Cr%C3%A8me+Mains',
      description: "Crème mains nourrissante pour des mains douces et protégées.",
      features: ['Absorption rapide', 'Sans gras', 'Parfum léger'],
      rating: 4.3,
      reviewCount: 44,
      inStock: true,
      sku: 'P11-CMH-2024',
      brand: 'JENA Care'
    },
    {
      id: 'p12',
      name: 'Spray Anti-Moustiques',
      category: 'Protection',
      price: 22.9,
      originalPrice: null,
      discount: null,
      isNew: true,
      imageUrl: 'https://placehold.co/800x800/22C55E/FFFFFF?text=Anti-Moustiques',
      description: "Protection efficace contre les moustiques, adapté à toute la famille.",
      features: ['Sans DEET', 'Jusqu’à 8h', 'Parfum frais'],
      rating: 4.0,
      reviewCount: 31,
      inStock: true,
      sku: 'P12-SAM-2024',
      brand: 'JENA Protect'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || 'p1';
    this.loadProduct();
  }

  private loadProduct(): void {
    // In real app, you would fetch from a service
    this.product = this.products.find(p => p.id === this.id) || this.products[0];
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (this.product) {
      const cartItem = {
        ...this.product,
        quantity: this.quantity
      };
      this.cartService.addToCart(cartItem);
      
      // Show success message (you can implement a toast service)
      this.showSuccessMessage('Produit ajouté au panier !');
    }
  }

  private showSuccessMessage(message: string): void {
    // Simple alert for demo - replace with proper toast notification
    alert(message);
  }

  scrollToActions(): void {
    const actionsElement = document.querySelector('.detail-card__actions');
    if (actionsElement) {
      actionsElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  getStars(rating: number): StarRating {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    // Return arrays with proper length for *ngFor
    return {
      fullStars: Array(fullStars).fill(0),
      hasHalfStar,
      emptyStars: Array(emptyStars).fill(0)
    };
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('fr-TN', {
      style: 'currency',
      currency: 'TND'
    }).format(price);
  }

  get discountPercentage(): number | null {
    if (!this.product?.originalPrice) return null;
    return Math.round((1 - this.product.price / this.product.originalPrice) * 100);
  }
}