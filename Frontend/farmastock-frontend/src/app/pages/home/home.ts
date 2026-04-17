import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [RouterLink, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements AfterViewInit {
  currentSlide = 0;
  cardCount = 3;

  ngAfterViewInit() {
    this.updateCarousel();
    setInterval(() => this.moveCarousel(1), 5000);
  }

  moveCarousel(direction: number) {
    this.currentSlide += direction;
    if (this.currentSlide < 0) this.currentSlide = this.cardCount - 1;
    if (this.currentSlide >= this.cardCount) this.currentSlide = 0;
    this.updateCarousel();
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.updateCarousel();
  }

  updateCarousel() {
    const track = document.getElementById('carouselTrack');
    const cards = document.querySelectorAll('.carousel-card');
    const dots = document.querySelectorAll('.carousel-dot');
    if (!track || cards.length === 0) return;

    cards.forEach((card, i) => {
      card.classList.toggle('active', i === this.currentSlide);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.currentSlide);
    });

    const cardEl = cards[0] as HTMLElement;
    const gap = 30;
    const cardWidth = cardEl.offsetWidth + gap;
    const containerWidth = (track.parentElement as HTMLElement).offsetWidth;
    const offset = containerWidth / 2 - cardWidth / 2 - this.currentSlide * cardWidth;
    track.style.transform = `translateX(${offset}px)`;
  }

  onSubmitContacto() {
    alert('Mensaje enviado correctamente');
  }
}