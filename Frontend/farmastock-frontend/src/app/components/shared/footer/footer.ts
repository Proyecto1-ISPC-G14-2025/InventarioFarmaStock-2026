import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule], // Agregamos CommonModule para poder usar el @if
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  mostrarFooter: boolean = true;

  constructor(private router: Router) {
    // Escuchamos el cambio de rutas del sistema
    this.router.events.subscribe(() => {
      const rutaActual = this.router.url;
      
      // Si la URL es la raíz (Home), el footer se muestra.
      // Si pasa a /login, /admin o /admin-usuarios, se oculta automáticamente.
      if (rutaActual === '/' || rutaActual === '') {
        this.mostrarFooter = true;
      } else {
        this.mostrarFooter = false;
      }
    });
  }
}