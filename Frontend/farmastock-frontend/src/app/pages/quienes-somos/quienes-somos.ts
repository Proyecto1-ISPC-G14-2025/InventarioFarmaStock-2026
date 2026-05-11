import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoWebService } from '../../services/info-web.service';
import { Miembro } from '../../models/miembro.model';

interface QuienesSomosData {
    titulo: string;
    mision: string;
    equipo: Miembro[];
}

@Component({
    selector: 'app-quienes-somos',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './quienes-somos.html'
})
export class QuienesSomosComponent {
    public info: QuienesSomosData;

    constructor(private infoService: InfoWebService) {
        this.info = this.infoService.quienesSomosInfo;
    }
}