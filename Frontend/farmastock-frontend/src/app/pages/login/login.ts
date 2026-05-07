import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  loginError = false;
  shaking = false;

  private usuarios: Record<string, { password: string; role: string }> = {
    'admin@correo.com':   { password: 'admin123', role: 'admin' },
    'usuario@correo.com': { password: 'user123',  role: 'user'  },
  };

  constructor(private router: Router) {}

  onLogin(): void {
    const user = this.usuarios[this.email];

    if (user && user.password === this.password) {
      this.loginError = false;
      // La redirección depende del rol guardado, no de lo que el usuario dice ser
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
}