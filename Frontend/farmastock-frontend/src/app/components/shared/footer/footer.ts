import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoWebService } from '../../../services/info-web.service'; 

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {

  public info;
  
  public anioActual: number = new Date().getFullYear();

  constructor(private infoService: InfoWebService) {
    this.info = this.infoService.footerInfo;
  }
}