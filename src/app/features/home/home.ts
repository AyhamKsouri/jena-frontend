import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {
  // Hot Deal countdown target: 7 days from now
  dealEndsAt: Date = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  private countdownInterval: any;

  constructor() {
    this.updateCountdown();
    this.countdownInterval = setInterval(() => this.updateCountdown(), 1000);
  }

  private updateCountdown(): void {
    const diff = this.dealEndsAt.getTime() - Date.now();
    if (diff <= 0) {
      this.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      clearInterval(this.countdownInterval);
      return;
    }
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (24 * 3600));
    const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    this.countdown = { days, hours, minutes, seconds };
  }

  // Ensure interval cleared when component destroyed
  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
}