import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  mostrarFooter: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const rutaActual = this.router.url;
      
      if (rutaActual === '/' || rutaActual === '') {
        this.mostrarFooter = true;
      } else {
        this.mostrarFooter = false;
      }
    });
  }
}