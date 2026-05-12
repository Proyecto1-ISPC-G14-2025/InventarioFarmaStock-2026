import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductosService, Medicamento } from '../../services/productos.service';

@Component({
  selector: 'app-admin',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {
  medicamentos: Medicamento[] = [];
  formulario: FormGroup;
  mensaje: string = '';
  mensajeTipo: 'success' | 'danger' | '' = '';
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService
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
    });
  }

  ngOnInit(): void {
    this.cargarMedicamentos();
  }

  cargarMedicamentos(): void {
    this.productosService.getAll().subscribe({
      next: (data) => this.medicamentos = data,
      error: () => this.mostrarMensaje('Error al cargar medicamentos', 'danger')
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.cargando = true;
    this.productosService.create(this.formulario.value).subscribe({
      next: () => {
        this.mostrarMensaje('Medicamento registrado correctamente', 'success');
        this.formulario.reset({ stock_actual: 0, stock_minimo: 5, precio_compra: 0 });
        this.cargarMedicamentos();
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
        this.mostrarMensaje('Medicamento eliminado', 'success');
        this.cargarMedicamentos();
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