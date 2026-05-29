import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  mostrarNavbar: boolean = true;

  constructor(private router: Router) {
    // Escuchamos los cambios de ruta del sistema
    this.router.events.subscribe(() => {
      const rutaActual = this.router.url;
      
      // Si el usuario está en el login o en el home vacío, ocultamos el Navbar
      if (rutaActual === '/login' || rutaActual === '/' || rutaActual === '') {
        this.mostrarNavbar = false;
      } else {
        this.mostrarNavbar = true;
      }
    });
  }
}
