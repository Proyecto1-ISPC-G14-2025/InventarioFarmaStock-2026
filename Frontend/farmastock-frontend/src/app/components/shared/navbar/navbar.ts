import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  mostrarNavbar: boolean = true;
  rolUsuario: string | null = '';

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const rutaActual = this.router.url;
      
      if (rutaActual === '/login' || rutaActual === '/' || rutaActual === '') {
        this.mostrarNavbar = false;
      } else {
        this.mostrarNavbar = true;
        this.rolUsuario = localStorage.getItem('userRole');
      }
    });
  }

  logout(): void {
    localStorage.removeItem('userRole'); 
    this.router.navigate(['/login']);    
  }
}
