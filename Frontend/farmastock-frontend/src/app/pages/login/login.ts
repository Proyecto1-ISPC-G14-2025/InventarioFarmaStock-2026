import { Component } from '@angular/core';
import { Router } from '@angular/router';
<<<<<<< HEAD
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
=======
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
>>>>>>> origin/develop
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loginError = false;
  shaking = false;
  loginForm!: FormGroup;
<<<<<<< HEAD
=======
  usuarios: Record<string, { password: string; role: string }> = {
    'admin@correo.com': { password: 'admin123', role: 'admin' },
    'usuario@correo.com': { password: 'user123', role: 'user' },
  };
>>>>>>> origin/develop

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
        this.passwordConNumero
      ]]
    });
  }

  passwordConNumero(control: AbstractControl): ValidationErrors | null {
    const tieneNumero = /\d/.test(control.value);
    return tieneNumero ? null : { sinNumero: true };
  }

  onLogin(): void {
    this.loginError = false;
    
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;
<<<<<<< HEAD

    this.http.post<any>(
      'http://localhost:8000/api/auth/login/',
      {
        username: email,
        password: password
      }
    ).subscribe({

      next: (data) => {

        localStorage.setItem('token', data.token);
        localStorage.setItem('rol', data.rol);
        localStorage.setItem('nombre', data.nombre);
        localStorage.setItem('user_id', data.user_id);

        if (data.rol === 'admin') {

          this.router.navigate(['/admin']);

        } else {

          this.router.navigate(['/usuario']);

        }

      },

      error: () => {

        this.loginError = true;

        this.shaking = true;

        setTimeout(() => {

          this.shaking = false;

        }, 600);

      }

    });

=======
    const user = this.usuarios[email ?? ''];

    if (user && user.password === password) {
      localStorage.setItem('userRole', user.role);
      
      if (user.role === 'admin') {
        this.router.navigate(['/admin']);
      } else if (user.role === 'user') {
        this.router.navigate(['/usuario']);
      }
    } else {
      this.loginError = true;
      this.shaking = true;
      setTimeout(() => (this.shaking = false), 500);
    }
>>>>>>> origin/develop
  }

  volverHome(): void {
    this.router.navigate(['']);
  }

  // ✅ Getters SOLAMENTE UNA VEZ cada uno (eliminé duplicados)
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}