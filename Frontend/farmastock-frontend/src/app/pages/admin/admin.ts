import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { ProductosService, Medicamento, Proveedor } from '../../services/productos.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CurrencyPipe],
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

  // Estado de edición: null = modo "crear", un id = modo "editar"
  editandoId: number | null = null;
  busqueda: string = '';

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService,
    private cdr: ChangeDetectorRef
  ) {
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      codigo_barras: ['', [Validators.required, Validators.pattern(/^\d{7,13}$/)]],
      categoria: ['', [Validators.required, Validators.minLength(3)]],
      lote: ['', [Validators.required]],
      stock_actual: [0, [Validators.required, Validators.min(0)]],
      stock_minimo: [5, [Validators.required, Validators.min(0)]],
      precio_compra: [0, [Validators.required, Validators.min(0.01)]],
      fecha_expiracion: ['', [Validators.required]],
      proveedor: [null]
    });
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargando = true;
    forkJoin({
      productos: this.productosService.getAll(),
      proveedores: this.productosService.getProveedores()
    }).subscribe({
      next: (res) => {
        this.medicamentos = res.productos;
        this.proveedores = res.proveedores;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar datos en el panel de administración:', err);
        this.mostrarMensaje('Error al cargar datos del servidor', 'danger');
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  get stockBajoCount(): number {
    return this.medicamentos.filter(m => m.stock_actual <= m.stock_minimo).length;
  }

  get modoEdicion(): boolean {
    return this.editandoId !== null;
  }

  // Filtra por nombre. stockBajoCount y las tarjetas de resumen siguen
  // calculándose sobre la lista completa, no sobre el resultado filtrado.
  get medicamentosFiltrados(): Medicamento[] {
    const texto = this.busqueda.trim().toLowerCase();
    if (!texto) return this.medicamentos;
    return this.medicamentos.filter(med => med.nombre.toLowerCase().includes(texto));
  }

  campo(nombreCampo: string) {
    return this.formulario.get(nombreCampo);
  }

  invalido(campo: string): boolean | null {
    const control = this.formulario.get(campo);
    return control && control.errors && control.touched;
  }

  onSubmit(): void {
    this.guardar();
  }

  // Carga los datos del medicamento seleccionado en el formulario
  // y pasa el componente a "modo edición".
  editar(med: Medicamento): void {
    this.editandoId = med.id ?? null;

    this.formulario.patchValue({
      nombre: med.nombre,
      codigo_barras: med.codigo_barras,
      categoria: med.categoria,
      lote: med.lote,
      stock_actual: med.stock_actual,
      stock_minimo: med.stock_minimo,
      precio_compra: med.precio_compra,
      fecha_expiracion: med.fecha_expiracion,
      proveedor: med.proveedor ?? null
    });

    // Para que el usuario vea el formulario ya cargado
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  cancelarEdicion(): void {
    this.editandoId = null;
    this.formulario.reset({ stock_actual: 0, stock_minimo: 5, precio_compra: 0, proveedor: null });
  }

  guardar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.cargando = true;
    const datos = this.formulario.value;

    if (this.modoEdicion) {
      this.productosService.update(this.editandoId!, datos).subscribe({
        next: (medicamentoActualizado) => {
          this.medicamentos = this.medicamentos.map(m =>
            m.id === this.editandoId ? medicamentoActualizado : m
          );
          this.mostrarMensaje('Medicamento actualizado correctamente', 'success');
          this.editandoId = null;
          this.formulario.reset({ stock_actual: 0, stock_minimo: 5, precio_compra: 0, proveedor: null });
          this.cargando = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error crítico al intentar actualizar medicamento:', err);
          const msg = err.status === 400
            ? 'Datos inválidos. Revisá el formulario.'
            : 'Error al actualizar el medicamento.';
          this.mostrarMensaje(msg, 'danger');
          this.cargando = false;
          this.cdr.detectChanges();
        }
      });
      return;
    }

    this.productosService.create(datos).subscribe({
      next: (nuevoMedicamento) => {
        this.medicamentos = [...this.medicamentos, nuevoMedicamento];
        this.mostrarMensaje('Medicamento registrado correctamente', 'success');
        this.formulario.reset({ stock_actual: 0, stock_minimo: 5, precio_compra: 0, proveedor: null });
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error crítico al intentar guardar medicamento:', err);
        const msg = err.status === 400
          ? 'Datos inválidos. Revisá el formulario.'
          : 'Error al registrar el medicamento.';
        this.mostrarMensaje(msg, 'danger');
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  eliminar(id: number): void {
    if (!confirm('¿Seguro que querés eliminar este medicamento?')) return;
    this.productosService.delete(id).subscribe({
      next: () => {
        this.medicamentos = this.medicamentos.filter(m => m.id !== id);
        this.mostrarMensaje('Medicamento eliminado', 'success');
        this.cdr.detectChanges();
      },
      error: () => {
        this.mostrarMensaje('Error al eliminar', 'danger');
        this.cdr.detectChanges();
      }
    });
  }

  mostrarMensaje(texto: string, tipo: 'success' | 'danger'): void {
    this.mensaje = texto;
    this.mensajeTipo = tipo;
    this.cdr.detectChanges();

    setTimeout(() => {
      this.mensaje = '';
      this.mensajeTipo = '';
      this.cdr.detectChanges();
    }, 3000);
  }
}