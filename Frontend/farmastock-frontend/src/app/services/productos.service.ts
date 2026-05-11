import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';

@Injectable({
    providedIn: 'root'
})
export class ProductosService {

    private listaProductos: Producto[] = [
        { id: 1, nombre: 'Paracetamol', laboratorio: 'Bayer', precio: 500, stock: 10, imagen: '...', categoria: 'Analgésicos' },
        { id: 2, nombre: 'Ibuprofeno', laboratorio: 'Bagó', precio: 800, stock: 5, imagen: '...', categoria: 'Antiinflamatorios' },
        { id: 3, nombre: 'Amoxicilina', laboratorio: 'Roemmers', precio: 1200, stock: 8, imagen: '...', categoria: 'Antibióticos' }
];

    constructor() { }


    getProductos(): Producto[] {
    return this.listaProductos;
    }
}