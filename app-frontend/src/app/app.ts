import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {

  currentSlide = 0;

  moveCarousel(direction: number) {
    this.currentSlide += direction;

    if (this.currentSlide < 0) this.currentSlide = 2;
    if (this.currentSlide > 2) this.currentSlide = 0;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }

}