import { Component, Output, EventEmitter, ElementRef, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Input() variant: 'header' | 'hero' | 'mobile' | 'overlay' = 'header';
  @Output() search = new EventEmitter<string>();
  @Output() searchFocus = new EventEmitter<void>();
  @Output() searchBlur = new EventEmitter<void>();
  @ViewChild('searchInput') searchInput!: ElementRef;

  searchTerm: string = '';

  onSearch(): void {
    this.search.emit(this.searchTerm);
  }

  onFocus(): void {
    this.searchFocus.emit();
  }

  onBlur(): void {
    this.searchBlur.emit();
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.search.emit('');
  }

  focusSearch(): void {
    this.searchInput.nativeElement.focus();
  }
}