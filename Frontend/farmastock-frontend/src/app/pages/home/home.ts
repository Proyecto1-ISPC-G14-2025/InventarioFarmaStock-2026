import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {
  contactoForm: FormGroup;
  enviado = false;
  currentSlide = 0;
  totalSlides = 3;
  autoPlayInterval: any;
  porcentajeDesplazamiento = 33.33;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.contactoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.pattern('^[0-9]+$')]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.startAutoPlay();
    this.evaluarPantalla();
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => this.evaluarPantalla());
    }
  }

  evaluarPantalla(): void {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768) {
        this.porcentajeDesplazamiento = 100;
      } else {
        this.porcentajeDesplazamiento = 33.33;
      }
      this.cdr.detectChanges();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  // --- Autoslide ---
  startAutoPlay(): void {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 4000); 
  }

  stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.cdr.detectChanges();
  }

  moveCarousel(direction: number): void {
    this.stopAutoPlay();
    this.currentSlide += direction;
    
    if (this.currentSlide < 0) {
      this.currentSlide = this.totalSlides - 1;
    } else if (this.currentSlide >= this.totalSlides) {
      this.currentSlide = 0;
    }
    
    this.cdr.detectChanges();
    this.startAutoPlay();
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    this.cdr.detectChanges();
    this.startAutoPlay();
  }

  onSubmitContacto(): void {
    if (this.contactoForm.valid) {
      console.log('Formulario enviado');
      this.enviado = true;
      this.contactoForm.reset();
      setTimeout(() => {
        this.enviado = false;
        this.cdr.detectChanges();
      }, 2000);
    }
  }
}