import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { CommonModule } from '@angular/common';

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

  usuarios: Record<string, { password: string; role: string }> = {

    'admin@correo.com': {
      password: 'admin123',
      role: 'admin'
    },

    'usuario@correo.com': {
      password: 'user123',
      role: 'user'
    },

  };

  constructor(
    private router: Router,
    private fb: FormBuilder
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

      setTimeout(() => {

        this.shaking = false;

      }, 600);

    }

  }

  get email() {

    return this.loginForm.get('email');

  }

  get password() {

    return this.loginForm.get('password');

  }

}