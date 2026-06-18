import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductosService, Medicamento } from '../../services/productos.service';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css'
})
export class Usuario implements OnInit {
  medicamentos: Medicamento[] = [];
  totalStock: number = 0;
  proximosAVencer: number = 0;
  cargando: boolean = false;
  busqueda: string = '';

  constructor(
    private productosService: ProductosService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarMedicamentos();
  }

  cargarMedicamentos(): void {
    this.cargando = true;
    this.productosService.getAll().subscribe({
      next: (data) => {
        this.medicamentos = data;
        this.calcularMetricas();
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar medicamentos en la vista de usuario:', err);
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  calcularMetricas(): void {
    this.totalStock = this.medicamentos.reduce((acc, med) => acc + (Number(med.stock_actual) || 0), 0);
    this.proximosAVencer = this.medicamentos.filter(med => (Number(med.stock_actual) || 0) <= (Number(med.stock_minimo) || 5)).length;
  }

  // Filtra por nombre, sin distinguir mayúsculas/minúsculas ni acentos exactos.
  // Las métricas de arriba (stock total, alertas) siempre se calculan sobre
  // la lista completa, no sobre el resultado filtrado.
  get medicamentosFiltrados(): Medicamento[] {
    const texto = this.busqueda.trim().toLowerCase();
    if (!texto) return this.medicamentos;
    return this.medicamentos.filter(med => med.nombre.toLowerCase().includes(texto));
  }

  // La edición real de medicamentos está protegida en el backend
  // (permiso EsAdminOSoloLectura: solo GET para usuarios no-admin).
  // Por eso este botón solo informa, no modifica datos.
  editarMedicamento(id: number | undefined): void {
    if (!id) return;
    alert('Solo un Administrador puede modificar este medicamento. Contactate con el panel de administración para solicitar el cambio.');
  }
}