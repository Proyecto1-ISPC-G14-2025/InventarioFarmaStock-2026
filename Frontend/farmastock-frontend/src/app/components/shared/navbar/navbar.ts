import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Agregamos esto para el @if y @for
import { RouterLink, RouterLinkActive } from '@angular/router';
import { InfoWebService } from '../../../services/info-web.service'; 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive], 
  templateUrl: './navbar.html',
})
export class Navbar {
  // 1. Mantenemos las variables que ya arreglamos
  public nombreFarmacia: string = 'FarmaStock';
  public estaLogueado: boolean = true; 
  
  // 2. Esta variable recibirá los datos del servicio
  public menuItems;

  constructor(private infoService: InfoWebService) {
    // 3. En lugar de escribir la lista acá, se la pedimos al servicio
    this.menuItems = this.infoService.menuItems;
  }
}
