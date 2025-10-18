import { Injectable, signal } from '@angular/core';
import { Cart, CartItem } from '../../shared/models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_STORAGE_KEY = 'jena_cart';
  
  // Using signals for reactive state management
  private cartSignal = signal<Cart>({
    items: [],
    totalItems: 0,
    totalPrice: 0
  });

  constructor() {
    this.loadCart();
  }

  // Expose cart as readonly
  get cart() {
    return this.cartSignal.asReadonly();
  }

  addToCart(product: any): void {
    const currentCart = this.cartSignal();
    const existingItemIndex = currentCart.items.findIndex(item => item.id === product.id);
    
    let updatedItems: CartItem[];
    
    if (existingItemIndex > -1) {
      // Update quantity if item already exists
      updatedItems = [...currentCart.items];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        quantity: updatedItems[existingItemIndex].quantity + 1
      };
    } else {
      // Add new item
      const newItem: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        imageUrl: product.imageUrl,
        category: product.category
      };
      updatedItems = [...currentCart.items, newItem];
    }
    
    this.updateCart(updatedItems);
  }

  removeFromCart(productId: string): void {
    const currentCart = this.cartSignal();
    const updatedItems = currentCart.items.filter(item => item.id !== productId);
    this.updateCart(updatedItems);
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    
    const currentCart = this.cartSignal();
    const updatedItems = currentCart.items.map(item => 
      item.id === productId ? { ...item, quantity } : item
    );
    
    this.updateCart(updatedItems);
  }

  clearCart(): void {
    this.cartSignal.set({
      items: [],
      totalItems: 0,
      totalPrice: 0
    });
    this.saveCart();
  }

  private updateCart(items: CartItem[]): void {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    this.cartSignal.set({
      items,
      totalItems,
      totalPrice
    });
    
    this.saveCart();
  }

  private saveCart(): void {
    localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(this.cartSignal()));
  }

  private loadCart(): void {
    const savedCart = localStorage.getItem(this.CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart) as Cart;
        this.cartSignal.set(parsedCart);
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
  }
}