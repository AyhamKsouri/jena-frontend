import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number | null;
  discount: number | null;
  isNew: boolean;
  imageUrl: string;
  rating?: number;
  reviewCount?: number;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  addProductToCart(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.addToCart.emit(this.product);
  }

  getStars(rating: number = 0): { fullStars: number[], hasHalfStar: boolean, emptyStars: number[] } {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return {
      fullStars: Array(fullStars).fill(0),
      hasHalfStar,
      emptyStars: Array(emptyStars).fill(0)
    };
  }
}