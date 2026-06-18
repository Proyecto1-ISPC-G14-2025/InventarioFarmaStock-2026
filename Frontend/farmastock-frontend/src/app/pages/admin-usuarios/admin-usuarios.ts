import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuariosService, UsuarioSistema } from '../../services/usuarios.service';

@Component({
  selector: 'app-admin-usuarios',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-usuarios.html',
  styleUrl: './admin-usuarios.css',
})
export class AdminUsuarios {
  usuarios: UsuarioSistema[] = [];
  cargando: boolean = false;
  mensaje: string = '';
  mensajeTipo: 'success' | 'danger' | '' = '';

  // Estado de edición: null = modo "crear", un id = modo "editar"
  editandoId: number | null = null;

  nuevoUsuario = {
    email: '',
    password: '',
    rol: 'usuario' as 'admin' | 'usuario'
  };

  constructor(
    private usuariosService: UsuariosService,
    private cdr: ChangeDetectorRef
  ) {
    this.cargarUsuarios();
  }

  get modoEdicion(): boolean {
    return this.editandoId !== null;
  }

  cargarUsuarios(): void {
    this.cargando = true;
    this.usuariosService.getAll().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
        this.mostrarMensaje('Error al cargar usuarios del servidor', 'danger');
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  agregarUsuario(): void {
    if (!this.nuevoUsuario.email) {
      alert('Por favor, completa el email.');
      return;
    }

    if (this.modoEdicion) {
      this.actualizarUsuario();
      return;
    }

    if (!this.nuevoUsuario.password) {
      alert('La contraseña es obligatoria para crear un usuario nuevo.');
      return;
    }

    // PerfilSerializer espera: username, email, password, rol
    // (usamos el email como username, igual que ya hace tu pantalla de login)
    const payload = {
      username: this.nuevoUsuario.email,
      email: this.nuevoUsuario.email,
      password: this.nuevoUsuario.password,
      rol: this.nuevoUsuario.rol
    };

    this.usuariosService.create(payload).subscribe({
      next: (creado) => {
        this.usuarios = [...this.usuarios, creado];
        this.mostrarMensaje('Usuario registrado con éxito.', 'success');
        this.resetFormulario();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al crear usuario:', err);
        const msg = err.status === 400
          ? 'Datos inválidos. Revisá el formulario (el email/username puede estar repetido).'
          : 'Error al registrar el usuario.';
        this.mostrarMensaje(msg, 'danger');
        this.cdr.detectChanges();
      }
    });
  }

  private actualizarUsuario(): void {
    const payload: Partial<UsuarioSistema> = {
      username: this.nuevoUsuario.email,
      email: this.nuevoUsuario.email,
      rol: this.nuevoUsuario.rol
    };

    // Solo mandamos password si el usuario escribió una nueva.
    if (this.nuevoUsuario.password) {
      payload.password = this.nuevoUsuario.password;
    }

    this.usuariosService.update(this.editandoId!, payload).subscribe({
      next: (actualizado) => {
        this.usuarios = this.usuarios.map(u => u.id === this.editandoId ? actualizado : u);
        this.mostrarMensaje('Usuario actualizado con éxito.', 'success');
        this.editandoId = null;
        this.resetFormulario();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al actualizar usuario:', err);
        const msg = err.status === 400
          ? 'Datos inválidos. Revisá el formulario.'
          : 'Error al actualizar el usuario.';
        this.mostrarMensaje(msg, 'danger');
        this.cdr.detectChanges();
      }
    });
  }

  eliminarUsuario(id: number): void {
    if (!confirm('¿Seguro que querés dar de baja a este usuario? Esta acción elimina también su cuenta de acceso.')) return;

    this.usuariosService.delete(id).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter(u => u.id !== id);
        this.mostrarMensaje('Usuario eliminado.', 'success');
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al eliminar usuario:', err);
        this.mostrarMensaje('Error al eliminar el usuario.', 'danger');
        this.cdr.detectChanges();
      }
    });
  }

  editarUsuario(user: UsuarioSistema): void {
    this.editandoId = user.id;
    this.nuevoUsuario = {
      email: user.email,
      password: '', // nunca se precarga: si el campo queda vacío, no se cambia
      rol: user.rol
    };
  }

  cancelarEdicion(): void {
    this.editandoId = null;
    this.resetFormulario();
  }

  private resetFormulario(): void {
    this.nuevoUsuario = { email: '', password: '', rol: 'usuario' };
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