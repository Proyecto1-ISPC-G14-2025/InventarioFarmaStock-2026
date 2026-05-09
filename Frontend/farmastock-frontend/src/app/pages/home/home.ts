import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
imports: [ReactiveFormsModule]

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})


export class Home {

  contactoForm: FormGroup;

  enviado = false;
  currentSlide = 0;

  constructor(private fb: FormBuilder) {

    this.contactoForm = this.fb.group({

      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      telefono: [
        '',
        [
          Validators.pattern('^[0-9]+$')
        ]
      ],

      mensaje: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(300)
        ]
      ]

    });



  }

  onSubmitContacto(): void {

    if (this.contactoForm.invalid) {

      this.contactoForm.markAllAsTouched();

      return;

    }

    console.log(this.contactoForm.value);

    this.enviado = true;

    this.contactoForm.reset();

  }

  moveCarousel(direction: number): void {

    const totalSlides = 3;

    this.currentSlide += direction;

    if (this.currentSlide < 0) {
      this.currentSlide = totalSlides - 1;
    }

    if (this.currentSlide >= totalSlides) {
      this.currentSlide = 0;
    }

    this.updateCarousel();

  }

  goToSlide(index: number): void {

    this.currentSlide = index;

    this.updateCarousel();

  }

  updateCarousel(): void {

    const track = document.getElementById('carouselTrack');

    if (track) {

      const offset = this.currentSlide * -100;

      track.style.transform = `translateX(${offset}%)`;

    }

  }

}

