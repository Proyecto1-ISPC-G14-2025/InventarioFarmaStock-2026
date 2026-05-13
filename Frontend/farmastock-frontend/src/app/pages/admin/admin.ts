import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductosService, Medicamento, Proveedor } from '../../services/productos.service';

@Component({
  selector: 'app-admin',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {
  medicamentos: Medicamento[] = [];
  proveedores: Proveedor[] = [];
  formulario: FormGroup;
  mensaje: string = '';
  mensajeTipo: 'success' | 'danger' | '' = '';
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService,
    private cdr: ChangeDetectorRef
  ) {
    this.formulario = this.fb.group({
      nombre:           ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      codigo_barras:    ['', [Validators.required, Validators.pattern(/^\d{7,13}$/)]],
      categoria:        ['', [Validators.required, Validators.minLength(3)]],
      lote:             ['', [Validators.required]],
      stock_actual:     [0,  [Validators.required, Validators.min(0)]],
      stock_minimo:     [5,  [Validators.required, Validators.min(0)]],
      precio_compra:    [0,  [Validators.required, Validators.min(0.01)]],
      fecha_expiracion: ['', [Validators.required]],
      proveedor:        [null],
    });
  }

  ngOnInit(): void {
    this.cargarMedicamentos();
    this.cargarProveedores();
  }

  get stockBajoCount(): number {
    return this.medicamentos.filter(m => m.stock_actual <= m.stock_minimo).length;
  }

  cargarMedicamentos(): void {
    this.productosService.getAll().subscribe({
      next: (data) => {
        this.medicamentos = [...data];
        this.cdr.detectChanges();
      },
      error: () => this.mostrarMensaje('Error al cargar medicamentos', 'danger')
    });
  }

  cargarProveedores(): void {
    this.productosService.getProveedores().subscribe({
      next: (data) => {
        this.proveedores = data;
        this.cdr.detectChanges();
      },
      error: () => console.warn('No se pudieron cargar los proveedores')
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.cargando = true;
    const valor = this.formulario.value;
    // Si proveedor quedó vacío, enviarlo como null
    if (!valor.proveedor) valor.proveedor = null;
    this.productosService.create(valor).subscribe({
      next: (nuevoMedicamento) => {
        this.medicamentos = [...this.medicamentos, nuevoMedicamento];
        this.cdr.detectChanges();
        this.mostrarMensaje('Medicamento registrado correctamente', 'success');
        this.formulario.reset({ stock_actual: 0, stock_minimo: 5, precio_compra: 0, proveedor: null });
        this.cargando = false;
      },
      error: (err) => {
        const msg = err.status === 400
          ? 'Datos inválidos. Revisá el formulario.'
          : 'Error al registrar el medicamento.';
        this.mostrarMensaje(msg, 'danger');
        this.cargando = false;
      }
    });
  }

  eliminar(id: number): void {
    if (!confirm('¿Seguro que querés eliminar este medicamento?')) return;
    this.productosService.delete(id).subscribe({
      next: () => {
        this.medicamentos = this.medicamentos.filter(m => m.id !== id);
        this.cdr.detectChanges();
        this.mostrarMensaje('Medicamento eliminado', 'success');
      },
      error: () => this.mostrarMensaje('Error al eliminar', 'danger')
    });
  }

  mostrarMensaje(texto: string, tipo: 'success' | 'danger'): void {
    this.mensaje = texto;
    this.mensajeTipo = tipo;
    setTimeout(() => { this.mensaje = ''; this.mensajeTipo = ''; }, 4000);
  }

  campo(nombre: string) { return this.formulario.get(nombre); }
  invalido(nombre: string): boolean {
    const c = this.campo(nombre);
    return !!(c && c.invalid && c.touched);
  }
}