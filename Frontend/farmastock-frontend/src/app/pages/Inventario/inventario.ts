import { Component } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-inventario',
    standalone: true,
  imports: [CommonModule],
    templateUrl: './inventario.html',
})
export class Inventario {
  tituloPagina: string = 'Listado de Medicamentos';

  productos: Producto[] = [
    { id: 1, nombre: 'Paracetamol', laboratorio: 'Bayer', precio: 500, stock: 10, imagen: '...', categoria: 'Analgésicos' },
    { id: 2, nombre: 'Ibuprofeno', laboratorio: 'Bagó', precio: 800, stock: 5, imagen: '...', categoria: 'Antiinflamatorios' },
    { id: 3, nombre: 'Amoxicilina', laboratorio: 'Roemmers', precio: 1200, stock: 8, imagen: '...', categoria: 'Antibióticos' }
  ];
}
