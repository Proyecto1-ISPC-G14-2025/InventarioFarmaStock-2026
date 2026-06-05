import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { ProductosService, Medicamento } from '../../services/productos.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css'
})
export class Usuario implements OnInit {
  medicamentos: Medicamento[] = [];
  totalStock: number = 0;
  proximosAVencer: number = 0;

  nuevoMedicamento = { id: 0, nombre: '', lote: '', stock_actual: 0, fecha_expiracion: '' };

  constructor(
    private productosService: ProductosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarMedicamentos();
  }

  cargarMedicamentos(): void {
    this.productosService.getAll().subscribe({
      next: (data) => {
        this.medicamentos = data;
        this.calcularMetricas();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar medicamentos en la vista de usuario:', err);
      }
    });
  }

  calcularMetricas(): void {
    this.totalStock = this.medicamentos.reduce((acc, med) => acc + (Number(med.stock_actual) || 0), 0);
    this.proximosAVencer = this.medicamentos.filter(med => (Number(med.stock_actual) || 0) <= (Number(med.stock_minimo) || 5)).length;
  }

  agregarMedicamentoLocal(): void {
    if (!this.nuevoMedicamento.nombre || !this.nuevoMedicamento.lote) return;
    
    const temporal: Medicamento = {
      id: this.medicamentos.length + 1,
      nombre: this.nuevoMedicamento.nombre,
      codigo_barras: '0000000',
      categoria: 'General',
      lote: this.nuevoMedicamento.lote,
      stock_actual: Number(this.nuevoMedicamento.stock_actual) || 0,
      stock_minimo: 5,
      precio_compra: 0,
      fecha_expiracion: this.nuevoMedicamento.fecha_expiracion || '2026-12-31'
    };

    this.medicamentos.push(temporal);
    this.calcularMetricas();
    this.nuevoMedicamento = { id: 0, nombre: '', lote: '', stock_actual: 0, fecha_expiracion: '' };
    this.cdr.detectChanges();
  }

  editarMedicamento(id: number | undefined): void {
    if (!id) return;
    alert(`Acción simulada: El empleado solicitó modificar el medicamento ID #${id}. (Lógica de edición protegida en el Backend para uso exclusivo del Administrador)`);
  }
}