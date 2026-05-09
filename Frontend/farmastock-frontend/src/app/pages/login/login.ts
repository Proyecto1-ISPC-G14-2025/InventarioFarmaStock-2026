import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgIf } from '@angular/common'; // <--- Necesario para que funcione *ngIf en el HTML

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf], // <--- Se agregó NgIf aquí
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  // Usamos inject() para inicializar servicios de forma segura en componentes standalone
  private fb = inject(FormBuilder);
  private router = inject(Router);

  loginError = false;
  shaking = false;

  usuarios: Record<string, { password: string; role: string }> = {
    'admin@correo.com': { password: 'admin123', role: 'admin' },
    'usuario@correo.com': { password: 'user123', role: 'user' },
  };

  // Ahora loginForm se crea sin errores porque fb ya fue inyectado arriba
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
  });

  constructor() { }

  onLogin(): void {
    this.loginError = false;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;
    const user = this.usuarios[email ?? ''];

    if (user && user.password === password) {
      if (user.role === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/usuario']);
      }
    } else {
      this.loginError = true;
      this.shaking = true;
      setTimeout(() => (this.shaking = false), 600);
    }
  }

  // Getters para facilitar el acceso a los controles desde el HTML
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}