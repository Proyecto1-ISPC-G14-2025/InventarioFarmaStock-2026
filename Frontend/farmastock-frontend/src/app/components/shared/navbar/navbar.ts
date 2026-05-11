import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { InfoWebService } from '../../../services/info-web.service'; 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive], 
  templateUrl: './navbar.html',
})
export class Navbar {
  public nombreFarmacia: string = 'FarmaStock';
  public estaLogueado: boolean = true; 
  
  public menuItems;

  constructor(public infoService: InfoWebService) {
    this.menuItems = this.infoService.menuItems;
  }
}
