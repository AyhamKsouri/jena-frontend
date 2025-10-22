import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  
  // Recommended products based on cart items
  recommendedProducts: any[] = [
    {
      id: 'rec1',
      name: 'Gel Nettoyant Doux',
      category: 'Soins Visage',
      price: 29.9,
      originalPrice: null,
      discount: null,
      isNew: true,
      imageUrl: 'https://placehold.co/300x300?text=Gel+Nettoyant'
    },
    {
      id: 'rec2', 
      name: 'Crème Hydratante Intensive',
      category: 'Soins Corps',
      price: 34.9,
      originalPrice: 39.9,
      discount: 12,
      isNew: false,
      imageUrl: 'https://placehold.co/300x300?text=Crème+Intensive'
    },
    {
      id: 'rec3',
      name: 'Sérum Anti-Âge',
      category: 'Soins Visage', 
      price: 59.9,
      originalPrice: null,
      discount: null,
      isNew: true,
      imageUrl: 'https://placehold.co/300x300?text=Sérum+Anti-Âge'
    }
  ];

  constructor(
    public cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  updateQuantity(item: CartItem, change: number): void {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      this.cartService.updateQuantity(item.id, newQuantity);
    }
  }

  removeItem(itemId: string): void {
    this.cartService.removeFromCart(itemId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  // Navigate to product details - FIXED VERSION
  goToProduct(productId: string): void {
    this.router.navigate(['/products', productId]);
  }

  // Add recommended product to cart
  addRecommendedProduct(product: any): void {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
      category: product.category
    };
    this.cartService.addToCart(cartItem);
  }
}