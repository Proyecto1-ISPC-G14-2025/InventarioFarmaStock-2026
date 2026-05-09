import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';

@Injectable({
    providedIn: 'root'
})
export class ProductosService {

    private listaProductos: Producto[] = [
    { id: 1, nombre: 'Paracetamol', laboratorio: 'Bayer', precio: 500, stock: 20, imagen: 'assets/img/p1.jpg' },
    { id: 2, nombre: 'Ibuprofeno', laboratorio: 'Bagó', precio: 800, stock: 4, imagen: 'assets/img/p2.jpg' },
    { id: 3, nombre: 'Amoxicilina', laboratorio: 'Roemmers', precio: 1200, stock: 15, imagen: 'assets/img/p3.jpg' }
    ];

    constructor() { }


    getProductos(): Producto[] {
    return this.listaProductos;
    }
}