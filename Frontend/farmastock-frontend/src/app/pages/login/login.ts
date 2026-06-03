import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
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

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ]
      ]

    });

  }

  onLogin(): void {

    this.loginError = false;

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;

    }

    const { email, password } = this.loginForm.value;

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

  }

  get email() {

    return this.loginForm.get('email');

  }

  get password() {

    return this.loginForm.get('password');

  }

}