import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
imports: [RouterLink, ReactiveFormsModule]

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginError = false;
  shaking = false;

  usuarios: Record<string, { password: string; role: string }> = {
    'admin@correo.com': { password: 'admin123', role: 'admin' },
    'usuario@correo.com': { password: 'user123', role: 'user' },
  };

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
  });

  constructor(private router: Router, private fb: FormBuilder) { }

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

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}