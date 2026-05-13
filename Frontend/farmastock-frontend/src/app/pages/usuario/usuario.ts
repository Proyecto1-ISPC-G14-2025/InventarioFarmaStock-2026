import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css'
})
export class Usuario {
  // Estos son los datos que se verán en las tarjetas y la tabla
  totalStock: number = 150;
  proximosAVencer: number = 5;

  nuevoMedicamento = { id: 0, nombre: '', lote: '', cantidad: 0, expiracion: '' };

  medicamentos = [
    { id: 1, nombre: 'Paracetamol', lote: 'A1234', cantidad: 50, expiracion: '2025-12-31' },
    { id: 2, nombre: 'Ibuprofeno', lote: 'B5678', cantidad: 30, expiracion: '2024-10-20' }
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  agregarMedicamento() {
    this.nuevoMedicamento.id = this.medicamentos.length + 1;
    this.medicamentos.push({ ...this.nuevoMedicamento });
    this.totalStock += this.nuevoMedicamento.cantidad;
    this.nuevoMedicamento = { id: 0, nombre: '', lote: '', cantidad: 0, expiracion: '' };
    this.cdr.detectChanges(); 
  }

  editarMedicamento(id: number) {
    console.log('Editando ID:', id);
  }
}
