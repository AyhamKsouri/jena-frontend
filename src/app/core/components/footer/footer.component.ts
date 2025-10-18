import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  
  footerLinks = [
    {
      title: 'Shop',
      links: [
        { label: 'All Products', path: '/products' },
        { label: 'New Arrivals', path: '/products/new' },
        { label: 'Best Sellers', path: '/products/best-sellers' },
        { label: 'Sale', path: '/products/sale' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', path: '/about' },
        { label: 'Contact', path: '/contact' },
        { label: 'Blog', path: '/blog' },
        { label: 'Careers', path: '/careers' }
      ]
    },
    {
      title: 'Customer Service',
      links: [
        { label: 'FAQ', path: '/faq' },
        { label: 'Shipping & Returns', path: '/shipping-returns' },
        { label: 'Privacy Policy', path: '/privacy-policy' },
        { label: 'Terms & Conditions', path: '/terms' }
      ]
    }
  ];
}