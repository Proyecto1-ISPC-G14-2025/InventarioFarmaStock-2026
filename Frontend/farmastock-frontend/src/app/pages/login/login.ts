import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
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

    console.log('BOTON INGRESAR');

    this.loginError = false;

    if (this.loginForm.invalid) {
      console.log('FORMULARIO INVALIDO');
      console.log(this.loginForm.value);

      this.loginForm.markAllAsTouched();
      return;
    }

    console.log('FORMULARIO VALIDO');

    const { password } = this.loginForm.value;

    console.log('ENVIANDO REQUEST A DJANGO...');

    this.http.post<any>(
      'http://localhost:8000/api/auth/login/',
      {
        username: 'admin',
        password: password
      }
    ).subscribe({

      next: (data) => {

        console.log('LOGIN OK');
        console.log(data);

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

      error: (err) => {

        console.log('ERROR LOGIN');
        console.log(err);

        this.loginError = true;
        this.shaking = true;

        setTimeout(() => {
          this.shaking = false;
        }, 600);

      }

    });
  }

  volverHome(): void {
    this.router.navigate(['']);
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}