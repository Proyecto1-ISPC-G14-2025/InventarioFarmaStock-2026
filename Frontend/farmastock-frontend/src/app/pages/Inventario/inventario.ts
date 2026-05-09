import { Component } from '@angular/core';
import { Producto } from '../../models/producto.model'; // Asegurate que la ruta sea correcta
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-inventario',
    standalone: true,
  imports: [CommonModule], // Necesario para usar las herramientas de Angular
    templateUrl: './inventario.html',
})
export class Inventario {
  // Aquí definimos los datos (Esto es lo que evita el hardcoding)
    tituloPagina: string = 'Listado de Medicamentos';
    
    misProductos: Producto[] = [
    { id: 1, nombre: 'Paracetamol', laboratorio: 'Bayer', precio: 500, stock: 20, imagen: 'assets/img/paracetamol.jpg' },
    { id: 2, nombre: 'Ibuprofeno', laboratorio: 'Bagó', precio: 850, stock: 5, imagen: 'assets/img/ibuprofeno.jpg' },
    { id: 3, nombre: 'Amoxicilina', laboratorio: 'Roemmers', precio: 1200, stock: 15, imagen: 'assets/img/amoxi.jpg' }
    ];
}