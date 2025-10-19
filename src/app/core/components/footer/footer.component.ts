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
      title: 'Boutique',
      links: [
        { label: 'Tous les produits', path: '/products' },
        { label: 'Nouveautés', path: '/products/new' },
        { label: 'Meilleures ventes', path: '/products/best-sellers' },
        { label: 'Promotions', path: '/products/sale' }
      ]
    },
    {
      title: 'Entreprise',
      links: [
        { label: 'À propos', path: '/about' },
        { label: 'Contact', path: '/contact' },
        { label: 'Blog', path: '/blog' },
        { label: 'Carrières', path: '/careers' }
      ]
    },
    {
      title: 'Service client',
      links: [
        { label: 'FAQ', path: '/faq' },
        { label: 'Livraison & Retours', path: '/shipping-returns' },
        { label: 'Politique de confidentialité', path: '/privacy-policy' },
        { label: 'Conditions générales', path: '/terms' }
      ]
    }
  ];
}