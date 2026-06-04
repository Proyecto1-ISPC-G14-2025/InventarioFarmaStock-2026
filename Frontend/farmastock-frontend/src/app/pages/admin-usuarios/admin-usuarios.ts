import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface UsuarioSistema {
  id: number;
  nombre: string;
  email: string;
  password?: string;
  rol: 'Administrador' | 'Usuario';
}

@Component({
  selector: 'app-admin-usuarios',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './admin-usuarios.html',
  styleUrl: './admin-usuarios.css',
})
export class AdminUsuarios implements OnInit {
  usuarios: UsuarioSistema[] = [
    { id: 1, nombre: 'Juan Lopez', email: 'jlopez@gmail.com', password: 'abc1234', rol: 'Usuario' },
    { id: 2, name: 'Ivan Muñoz', email: 'imunoz@gmail.com', password: 'nchjd123', rol: 'Administrador' } as any
  ];

  nuevoUsuario = {
    nombre: '',
    email: '',
    password: '',
    rol: 'Usuario' as 'Administrador' | 'Usuario'
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    
    if ((this.usuarios[1] as any).name) {
      this.usuarios[1].nombre = (this.usuarios[1] as any).name;
    }
    console.log('Panel de administración de usuarios sincronizado y listo.');
  }

  agregarUsuario(): void {
    if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.email || !this.nuevoUsuario.password) {
      alert('Por favor, completa todos los campos del formulario.');
      return;
    }

    const nuevo: UsuarioSistema = {
      id: this.usuarios.length + 1,
      nombre: this.nuevoUsuario.nombre,
      email: this.nuevoUsuario.email,
      password: this.nuevoUsuario.password,
      rol: this.nuevoUsuario.rol
    };

    this.usuarios = [...this.usuarios, nuevo];


    this.nuevoUsuario = { nombre: '', email: '', password: '', rol: 'Usuario' };
    this.cdr.detectChanges();

    alert('¡Usuario registrado con éxito en el panel de control!');
  }

  eliminarUsuario(id: number): void {
    if (!confirm('¿Seguro que querés dar de baja a este usuario?')) return;
    this.usuarios = this.usuarios.filter(user => user.id !== id);
    this.cdr.detectChanges();
  }

  editarUsuario(user: UsuarioSistema): void {
    
    this.nuevoUsuario = {
      nombre: user.nombre,
      email: user.email,
      password: user.password || '******',
      rol: user.rol
    };
    
    
    this.usuarios = this.usuarios.filter(u => u.id !== user.id);
    this.cdr.detectChanges();
    
    alert(`Datos cargados en el formulario de abajo para su modificación.`);
  }
}