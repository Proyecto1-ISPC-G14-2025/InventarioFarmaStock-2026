import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService, Medicamento, Proveedor } from '../../services/productos.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
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
    @Inject(ProductosService) private productosService: ProductosService,
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
      proveedor:        [null]
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
      },
      error: () => {
        this.mostrarMensaje('Error al cargar datos del servidor', 'danger');
        this.cargando = false;
      }
    });
  }

  get stockBajoCount(): number {
    return this.medicamentos.filter(m => m.stock_actual <= m.stock_minimo).length;
  }

  // --- Puentes y Validaciones (HTML) ---
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

  guardar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.cargando = true;
    const datos = this.formulario.value;

    this.productosService.create(datos).subscribe({
      next: (nuevoMedicamento) => {
        this.medicamentos = [...this.medicamentos, nuevoMedicamento];
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
        this.mostrarMensaje('Medicamento eliminado', 'success');
      },
      error: () => this.mostrarMensaje('Error al eliminar', 'danger')
    });
  }

  mostrarMensaje(texto: string, tipo: 'success' | 'danger'): void {
    this.mensaje = texto;
    this.mensajeTipo = tipo;
    setTimeout(() => {
      this.mensaje = '';
      this.mensajeTipo = '';
      this.cdr.detectChanges();
    }, 3000);
  }
}